import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
export class FetchData extends Component {
  static displayName = FetchData.name;
  static counter = 0;

  constructor(props) {
    super(props);
    this.state = {
      animals: [],
      error: "",
      animal: Object,
      addObject: Object,
      id: 0,
      loading: true,
      loadingAn: true,
      urlAdd: "https://localhost:5001/animal",
    };
  }

  componentDidMount() {
    this.populateAnimalData();
  }
  componentDidUpdate() {
    this.populateAnimalData();
  }
  searchOnclick() {
    //aşağıdaki populate animals gibi method yazılmalısın ismi getAnimal(int id) olabilir fetch('animal') yerine fetch('animal/id'); yazmalısın getAnimala yollayacağın id searchün üstündeki textboxt ın verisi olmalı
    //getAnimal(idSearch.text)
    const inputVal = document.getElementById("getData").value;

    this.setState({ id: inputVal });

    this.GetAnimalData();
    this.setState({ loadingAn: false });

    this.setState({ counter: true });
  }
  addOnclick() {
    const idToAdd = document.getElementById("idToAddInput").value;
    const ageToAdd = document.getElementById("ageToAddInput").value;

    var nextDateToAdd = document.getElementById("nextVacToAddInput").value;
    var lastDateToAdd = document.getElementById("lastVacToAddInput").value;
    var nextDateObj = new Date(nextDateToAdd);
    nextDateObj.toJSON();
    var lastDateObj = new Date(lastDateToAdd);
    lastDateObj.toJSON();

    var data = {
      id: parseInt(idToAdd),
      lastVaccineDate: nextDateObj,
      nextVaccineDate: lastDateObj,
      age: parseInt(ageToAdd),
    };
    this.setState({ addObject: data });
    //this.postData();
    console.log("data:" + data);
    console.log("datajson:" + JSON.stringify(data));
    fetch("https://localhost:5001/animal/add", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
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
  static updateOnClick() {
    const idToUpdate = document.getElementById("getData").value;
    const ageToUpdate = document.getElementById("ageUpdateText").value;
    var nextDateToUpdate = document.getElementById("nextDateUpdateText").value;
    var lastDateToUpdate = document.getElementById("lastDateUpdateText").value;
    var nextDateObj = new Date(nextDateToUpdate);
    nextDateObj.toJSON();
    var lastDateObj = new Date(lastDateToUpdate);
    lastDateObj.toJSON();

    var datam = {
      id: parseInt(idToUpdate),
      lastVaccineDate: lastDateObj,
      nextVaccineDate: nextDateObj,
      age: parseInt(ageToUpdate),
    };
    fetch("https://localhost:5001/animal/update", {
      method: "PUT",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
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
  static renderUpdate() {
    return (
      <div className="updateInputsDiv">
        Age : <input type="text" id="ageUpdateText" className="updateInputs" />
        Last Vaccine Date :{" "}
        <input id="lastDateUpdateText" type="date" className="updateInputs" />
        Next Vaccine Date :{" "}
        <input id="nextDateUpdateText" type="date" className="updateInputs" />
        <button
          className="updateButton"
          onClick={this.updateOnClick.bind(this)}
        >
          Update
        </button>
      </div>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderAnimalsTable(this.state.animals)
    );
    let contentsx = this.state.loadingAn ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderAnimal(this.state.animal)
    );
    let contentsUpdate = this.state.loadingAn ? (
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
        <button onClick={this.searchOnclick.bind(this)}>Search</button>
        {contentsx}
        {contentsUpdate}
        <div className="data"></div>
        <div className="addInputsDiv">
          ID : <input type="text" id="idToAddInput" className="addInputs" />
          Age : <input type="text" id="ageToAddInput" className="addInputs" />
          Last Vaccine Date :{" "}
          <input type="date" id="nextVacToAddInput" className="addInputs" />
          Next Vaccine Date :{" "}
          <input type="date" id="lastVacToAddInput" className="addInputs" />
          <button className="addButton" onClick={this.addOnclick.bind(this)}>
            Add
          </button>
        </div>
        {contents}
      </div>
    );
  }

  async populateAnimalData() {
    const response = await fetch("animal");
    const data = await response.json();
    this.setState({ animals: data, loading: false });
  }

  async GetAnimalData() {
    const response = await fetch("animal/" + this.state.id);
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
