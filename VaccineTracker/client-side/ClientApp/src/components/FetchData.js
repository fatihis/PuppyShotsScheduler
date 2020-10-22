import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Button } from "react-bootstrap";
export class FetchData extends Component {
  static displayName = FetchData.name;
  static counter = 0;

  constructor(props) {
    super(props);
    this.state = {
      animals: [], //to retrieve animal list (all animals) with httpget method
      animal: Object, //to retrieve with httpget method
      addObject: Object, //to send with httppost method
      id: 0, //getting animal id
      loading: true, //loading state to keep under control tables and fields of animal table
      loadingAn: true, //loading state to keep under control tables and fields of animal object
      urlAdd: "https://localhost:5001/animal", //add url state for using out of the scope
    };
  }

  componentDidMount() {
    this.populateAnimalData(); // get animal data
  }
  componentDidUpdate() {
    this.populateAnimalData(); //update date if state has changed ( add, delete or update animal)
  }
  searchOnclick() {
    //(aysegule) aşağıdaki populate animals gibi method yazılmalısın ismi getAnimal(int id) olabilir fetch('animal') yerine fetch('animal/id'); yazmalısın getAnimala yollayacağın id searchün üstündeki textboxt ın verisi olmalı

    const inputVal = document.getElementById("getData").value;
    this.setState({ id: inputVal }); //set textbox value to id state
    this.GetAnimalData(); // calls fetching for single animal
    this.setState({ loadingAn: false }); //let contents to fill up
  }
  addOnclick() {
    const idToAdd = document.getElementById("idToAddInput").value;
    const ageToAdd = document.getElementById("ageToAddInput").value;
    var nextDateToAdd = document.getElementById("nextVacToAddInput").value;
    var lastDateToAdd = document.getElementById("lastVacToAddInput").value;
    var nextDateObj = new Date(nextDateToAdd); //because of using DateTime data type on serverside need to handle before post
    nextDateObj.toJSON();
    var lastDateObj = new Date(lastDateToAdd); //because of using DateTime data type on serverside need to handle before post
    lastDateObj.toJSON();

    var data = {
      //construct animal data to post
      id: parseInt(idToAdd), //html button returns string so parsing it to integer
      lastVaccineDate: nextDateObj,
      nextVaccineDate: lastDateObj,
      age: parseInt(ageToAdd), //html button returns string so parsing it to integer
    };
    console.log("data:" + data); //tests
    console.log("datajson:" + JSON.stringify(data));
    fetch("https://localhost:5001/animal/add", {
      //fetching data httppost
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json(data))
      .then((data) => {
        alert("Success", data);
      })
      .catch((error) => {
        alert("Error", error);
      });

    /* fetch('https://localhost:5001/animal/add/',
    {
    method: 'POST',
    headers:{
    'Accept': 'application/json',
    'Content-Type':'application/json'
  },
    body:JSON.stringify({
      ID : idToAdd,
      LastVaccineDate: null,
      NextVaccineDate: null,
      Age: ageToAdd,
    })
  })
    .then(res => res.JSON())
    .then((result)=>{
      alert(result);
    },
    (error) =>
    {
      alert('failed')
    })*/

    /*const options = { 
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, ',
      'Content-Type': 'application/json'
    },
       body: JSON.stringify(this.addObject)
  
  }    
  fetch('https://localhost:5001/animal/add', options)
  .then(response => {
              
   if (response.ok) {
     alert('okey')
           return response.json();
         } else {
          alert('not okey')
            throw new Error('Something went wrong ...');
         }
       })
         .catch(error => this.setState({ error }));
         */

    /* var request = new Request('https://localhost:5001/animal', {
      method: 'POST',
      body: JSON.stringify(this.addObject),
      headers: {'Content-Type': 'application/json'}
    });
    fetch(request)
    .then(function(response) {
      if (!response.ok) {
        alert(response.status);
        
        
      }
      return response.blob();
    });*/
  }
  deleteOnClick() {
    var deleteElementId = document.getElementById("getData").value;
    fetch("https://localhost:5001/animal/" + deleteElementId, {
      //fetching data http delete
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
  }
  static updateOnClick() {
    const idToUpdate = document.getElementById("getData").value;
    const ageToUpdate = document.getElementById("ageUpdateText").value;
    var nextDateToUpdate = document.getElementById("nextDateUpdateText").value;
    var lastDateToUpdate = document.getElementById("lastDateUpdateText").value;
    var nextDateObj = new Date(nextDateToUpdate); //because of using DateTime data type on serverside need to handle before put
    nextDateObj.toJSON();
    var lastDateObj = new Date(lastDateToUpdate); //because of using DateTime data type on serverside need to handle before put
    lastDateObj.toJSON();

    var datam = {
      id: parseInt(idToUpdate), //html button returns string so parsing it to integer
      lastVaccineDate: lastDateObj,
      nextVaccineDate: nextDateObj,
      age: parseInt(ageToUpdate), //html button returns string so parsing it to integer
    };
    fetch("https://localhost:5001/animal/update", {
      //fetching data httpput
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datam),
    })
      .then((response) => response.json(datam))
      .then((datam) => {
        alert("Success", datam);
      })
      .catch((error) => {
        alert("Error", error);
      });
  }

  static renderAnimal(animal) {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Last Vaccine Date</th>
            <th>Age</th>
            <th>Next Appointment</th>
          </tr>
        </thead>
        <tbody>
          <tr key={animal.id}>
            <td id="idDataRow">{animal.id}</td>
            <td id="lastDataRow">{animal.lastVaccineDate}</td>
            <td id="ageDataRow">{animal.age}</td>
            <td id="nextDataRow">{animal.nextVaccineDate}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  static renderAnimalsTable(animals) {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Last Vaccine Date</th>
            <th>Age</th>
            <th>Next Appointment</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.id}</td>
              <td>{animal.lastVaccineDate}</td>
              <td>{animal.age}</td>
              <td>{animal.nextVaccineDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  static renderUpdate() {
    return (
      <div className="updateInputsDiv">
        Age : <input type="text" id="ageUpdateText" className="updateInputs" />
        Last Vaccine Date :{" "}
        <input id="lastDateUpdateText" type="date" className="updateInputs" />
        Next Vaccine Date :{" "}
        <input id="nextDateUpdateText" type="date" className="updateInputs" />
        <Button
          variant="primary"
          className="updateButton"
          onClick={this.updateOnClick.bind(this)}
        >
          Update
        </Button>
      </div>
    );
  }

  render() {
    //for not to enable fields before retrive data
    let renderanimaltable = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderAnimalsTable(this.state.animals)
    );
    //for not to enable fields before retrive data
    let renderanimal = this.state.loadingAn ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderAnimal(this.state.animal)
    );
    //for not to enable fields before retrive data
    let renderupdate = this.state.loadingAn ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderUpdate(this.state.animal)
    );

    return (
      <div>
        <h1 id="tabelLabel">Pet List</h1>
        <p>In progress</p>
        ID:
        <input type="text" id="getData" className="idSearch" />
        <Button variant="primary" onClick={this.searchOnclick.bind(this)}>
          Search
        </Button>
        <Button variant="primary" onClick={this.deleteOnClick.bind(this)}>
          Delete
        </Button>
        {renderanimal}
        {renderupdate}
        <div className="data"></div>
        <div className="addInputsDiv">
          ID : <input type="text" id="idToAddInput" className="addInputs" />
          Age : <input type="text" id="ageToAddInput" className="addInputs" />
          Last Vaccine Date :{" "}
          <input type="date" id="nextVacToAddInput" className="addInputs" />
          Next Vaccine Date :{" "}
          <input type="date" id="lastVacToAddInput" className="addInputs" />
          <Button
            variant="primary"
            className="addButton"
            onClick={this.addOnclick.bind(this)}
          >
            Add
          </Button>
        </div>
        {renderanimaltable}
      </div>
    );
  }

  async populateAnimalData() {
    const response = await fetch("animal"); //fetching localhost/animal httpget
    const data = await response.json();
    this.setState({ animals: data, loading: false });
  }

  async GetAnimalData() {
    const response = await fetch("animal/" + this.state.id); //fetching localhost/animal/{id} httpget
    const data = await response.json();
    this.setState({ animal: data });
  }
  /*async postData() {
    const response = await fetch("animal/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(this.addObject),
    });

    return response.json();
  }*/
}
