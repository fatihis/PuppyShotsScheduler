import React, { Component } from 'react';
import MenuComp from "./MenuComp"

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
           
            <MenuComp />

      </div>
    );
  }
}
