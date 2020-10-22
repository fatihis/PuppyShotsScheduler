import React, { Component } from 'react';
import * as ReactBootStrap from "react-bootstrap";

const MenuComp = () => {

  
  let puppys=[
    {puppyName: "lidya", puppyAge:4, puppyId:123456, puppyLatestVaccine: "10.03.2020", puppyNextVaccine: "25.11.2020"},
    {puppyName: "puki", puppyAge:2, puppyId:958457},
    {puppyName: "tommy", puppyAge:5, puppyId:561458},
    {}, {},{},{},{},{},{},{}
  ]
  const renderPuppy = (puppy, index) => {
    return (
      <tr key = {index}>
        <td>{puppy.puppyId}</td>
        <td>{puppy.puppyName}</td>
        <td>{puppy.puppyAge}</td>
        <td>{puppy.puppyLatestVaccine}</td>
        <td>{puppy.puppyNextVaccine}</td>
       
      </tr>
    )
  }
  return (
    <div className="App">



    <ReactBootStrap.Table striped bordered hover>
<thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Age</th>
    <th>Latest Vaccine Date</th>
    <th>Next Vaccine Date</th>
  </tr>
</thead>
<tbody>
    {puppys.map(renderPuppy)}
</tbody>
</ReactBootStrap.Table>
    
    
    </div>
  );
}



export default MenuComp;
