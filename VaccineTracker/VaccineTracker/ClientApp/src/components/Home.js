import React, { Component } from 'react';
import MenuComp from "./MenuComp"

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <p>//Search module should be hear within 12 hours</p>
            <MenuComp />

      </div>
    );
  }
}
