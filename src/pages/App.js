import React, { Component } from 'react';
import logo from '../images/appIcon.png';
import background from '../images/las_lajas.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-title">
            <div id="divTitle">
              <a1>Hotelz</a1>
              <a2>.com</a2>
            </div>
          </div>
          <div className="App-header-btns">
            <button>Hotels</button>
            <button>Cities</button>
            <button>Profile</button>
          </div>
        </header>
        <div className="App-body">
          <div className="search-form">
            <label>Fecha inicio </label><input></input><br/>
            <label>Fecha fin </label><input></input><br/>
            <label>Lugar </label><input></input><br/>
            <label># personas </label><input></input><br/>
            <label>Tipo </label><input></input><br/>
            <button>Buscar</button>
          </div>
        </div>
        <div className="App-footer">
          <a>Powered by: Reduxers</a>
        </div>
      </div>
    );
  }
}

export default App;
