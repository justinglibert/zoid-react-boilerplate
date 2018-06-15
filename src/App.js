import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import {EasyScaleButton} from './zoid/button'

class App extends Component {
  render() {
    let EasyScaleButtonReact = EasyScaleButton.driver('react', {
      React: React,
      ReactDOM: ReactDOM
    });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <EasyScaleButtonReact text="Hey"/>
      </div>
    );
  }
}

export default App;
