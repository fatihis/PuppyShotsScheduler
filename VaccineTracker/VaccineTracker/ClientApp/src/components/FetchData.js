import React, { Component } from 'react';
import * as ReactBootStrap from "react-bootstrap";
export class FetchData extends Component {
  static displayName = FetchData.name;
  static counter = 0;

  constructor(props) {
    super(props);
    this.state = { animals: [], animal: Object, id: 0, loading: true, loadingAn: true };
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


  
  
}
