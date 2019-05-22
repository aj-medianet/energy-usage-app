/*var React = require('react');
var App = React.createClass({
  getInitialState: function() {
    return {
      members: []
    };
  },
  componentDidMount() {
    fetch('/')
      .then(res => res.json())
      .then(members => this.setState({ members: members}));
  },
  render: function() {
    return (
      <div className="Devices">
        <h1>Devices</h1>
        {this.state.devices.map(devices =>
          <div key={devices.id}>{devices.name} - {devices.manufacturer} - {devices.currentEnergyUsage}</div>
          )}
        </div>
      );
  }
});

module.exports = App;
*/

import React from 'react';


import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

