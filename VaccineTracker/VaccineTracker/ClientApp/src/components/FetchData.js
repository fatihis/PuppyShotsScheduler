import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;
  

  constructor(props) {
    super(props);
    this.state = { animals: [], loading: true };
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
              <tr key={animal.ID}>
              <td>{animal.ID}</td>
              <td>{animal.Age}</td>
              <td>{animal.LastVaccineDate}</td>
              <td>{animal.NextVaccineDate}</td>
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
