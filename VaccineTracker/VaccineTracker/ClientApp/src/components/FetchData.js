import React, { Component } from 'react';
import * as ReactBootStrap from "react-bootstrap";
export class FetchData extends Component {
  static displayName = FetchData.name;
  static counter = 0;

  constructor(props) {
    super(props);
    this.state = { animals: [], animal: Object, addObject : Object, id: 0, loading: true, loadingAn: true, urlAdd : 'https://localhost:5001/add'};
  }

  componentDidMount() {
    this.populateAnimalData();
   
  }
  async searchOnclick(){
  //aşağıdaki populate animals gibi method yazılmalısın ismi getAnimal(int id) olabilir fetch('animal') yerine fetch('animal/id'); yazmalısın getAnimala yollayacağın id searchün üstündeki textboxt ın verisi olmalı
  //getAnimal(idSearch.text)
  const inputVal = document.getElementById("getData").value;
  alert(inputVal);
  this.setState({ id: inputVal });

  this.GetAnimalData();
 

}
  async addOnclick(){
    alert(document.getElementById("idToAddInput").value+" eklendi");
    const idToAdd = document.getElementById("idToAddInput").value;
    const ageToAdd = document.getElementById("ageToAddInput").value;
    const nextDateToAdd = document.getElementById("nextVacToAddInput").value;
    const lastDateToAdd = document.getElementById("lastVacToAddInput").value;

    
    let data = {
      id : idToAdd,
      lastVaccineDate: lastDateToAdd,
      nextVaccineDate: nextDateToAdd,
      age: ageToAdd
  };
  this.setState({addObject : data});
  alert(data.id);

  this.postData();
  /*
  const url = 'https://localhost:5001/add';

    var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',
      credentials: 'same-origin',
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
    <table className='table table-striped' aria-labelledby="tabelLabel">
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
            <td>{animal.id}</td>
            <td>{animal.lastVaccineDate}</td>
            <td>{animal.age}</td>
            <td>{animal.nextVaccineDate}</td>
        </tr>
        
      </tbody>
    </table>
  );
}
  

  static renderAnimalsTable(animals) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            
                    <th>ID</th>
                    <th>Last Vaccine Date</th>
                    <th>Age</th>
                    <th>Next Appointment</th>
                              </tr>
        </thead>
        <tbody>
          
        {animals.map(animal =>
              <tr key={animal.id}>
              <td>{animal.id}</td>
              <td>{animal.lastVaccineDate}</td>
              <td>{animal.age}</td>
              <td>{animal.nextVaccineDate}</td>
          </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderAnimalsTable(this.state.animals);
     let contentsx = this.state.loadingAn
      ? <p><em>Loading...</em></p>
      :  FetchData.renderAnimal(this.state.animal);

    return (
      <div>
        <h1 id="tabelLabel" >Pet List</h1>
        <p>In progress</p>
        ID:   
        <input type="text" id="getData" className="idSearch"/>
        <button onClick={this.searchOnclick.bind(this)}>Search</button>
        {contentsx}
        
      

    <div className="data">

   
    
    
    </div>
  

        <div className="updateInputsDiv">
        Age : <input type="text" className="updateInputs"/>
        Last Vaccine Date : <input type="text" className="updateInputs"/>
        Next Vaccine Date : <input type="text" className="updateInputs"/>
        <button className="updateButton">Update</button>
        </div>
        <div className="addInputsDiv">
        ID : <input type="text" id="idToAddInput" className="addInputs"/>
        Age : <input type="text" id="ageToAddInput" className="addInputs"/>
        Last Vaccine Date : <input type="date" id="nextVacToAddInput" className="addInputs"/>
        Next Vaccine Date : <input type="date" id="lastVacToAddInput" className="addInputs"/>
        <button className="addButton" onClick={this.addOnclick.bind(this)}>Add</button>

        </div>
       
        {contents}
        
      </div>
    );
  }

  async populateAnimalData() {
    const response = await fetch('animal');
    const data = await response.json();
    this.setState({ animals: data, loading: false });
  }

  
  async GetAnimalData() {
    const response = await fetch('animal/'+this.state.id);
    alert('animal/'+this.state.id);
    const data = await response.json();
    this.setState({ animal: data, loadingAn : false });
  }
   async postData() {
    const response = await fetch(this.urlAdd, {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(this.addObject) 
    });
    return response.json(); 
  }
  


  
  
}
