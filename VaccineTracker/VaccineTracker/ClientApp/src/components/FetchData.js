import React, { Component } from 'react';
import * as ReactBootStrap from "react-bootstrap";
export class FetchData extends Component {
  static displayName = FetchData.name;
  static counter = 0;

  constructor(props) {
    super(props);
    this.state = { animals: [], animal: Object, loading: true };
  }

  componentDidMount() {
    this.populateAnimalData();
   
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

    return (
      <div>
        <h1 id="tabelLabel" >Pet List</h1>
        <p>In progress</p>
        ID:   
        <input type="text" className="idSearch"/>
        <button >Search</button>
       
        
      

    <div className="data">

    <ReactBootStrap.Table striped bordered hover>
<thead>
  <tr>
    <th>ID</th>
    <th>Age</th>
    <th>Latest Vaccine Date</th>
    <th>Next Vaccine Date</th>
  </tr>
  <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
  </tr>
</thead>

</ReactBootStrap.Table>
    
    
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
  
}
