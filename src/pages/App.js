import React, { Component } from 'react';
import logo from '../images/appIcon.png';
import './App.css';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import ApiHotelzFunctions from '../rest/apiHotelz'

const apiHotelz = new ApiHotelzFunctions()

const endpoints = {
  pythonEndpoint    : "http://www.pythonendpoint.edu/api/",
  goEndpoint        : "http://www.goendpoint.edu/api/",
  nodeEndpoint      : "http://www.nodeendpoint.edu/api/",
  scalaEndpoint     : "http://www.scalaendpoint.edu/api/",
  testMLURL         : "https://api.mercadolibre.com/sites/MCO/"
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiUrl: '',
      startDate: '',
      endDate: '',
      place: '',
      ammountPpl: '',
      roomType: ''
    }
    this.getRooms = this.getRooms.bind(this)
  }
  state = {
    selectedStartDay: undefined,
    selectedEndDay: undefined,
    isDisabled: false
  }

  getRooms(props){
    var promisePy = apiHotelz.getRooms(
      endpoints.testMLURL,
      this.state.startDate,
      this.state.endDate,
      this.state.place,
      this.state.ammountPpl,
      this.state.roomType
    )
    promisePy.then(function(resolve) {
      console.log("@@@ ",resolve);
    })
    .catch(function(error){
      console.log("@@@ ",error);
    })
  }

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

            <DateRangePicker
              startDate={this.state.startDate} // momentPropTypes.momentObj or null,
              endDate={this.state.endDate} // momentPropTypes.momentObj or null,
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />
            <br/>
            <label>Lugar </label><input></input><br/>
            <label># personas </label><input></input><br/>
            <label>Tipo </label><input></input><br/>
            <button onClick={this.getRooms}>Buscar</button>
          </div>
        </div>
        <div className="App-footer">
          <a>Powered by: Redux haters from hell</a>
        </div>
      </div>
    );
  }
}

export default App;
