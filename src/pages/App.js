import React, { Component } from 'react';
import logo from '../images/appIcon.png';
import './App.css';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import ApiHotelzFunctions from '../rest/apiHotelz'

const apiHotelz = new ApiHotelzFunctions()

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      startDate: '',
      endDate: '',
      place: '',
      ammountPpl: '',
      roomType: '',
      roomsUnprocessedData: [''],
      roomsData: []
    }
    this.getRoomsPy = this.getRoomsPy.bind(this)
    this.processRoomsData = this.processRoomsData.bind(this)
  }
  state = {
    selectedStartDay: undefined,
    selectedEndDay: undefined,
    isDisabled: false
  }

  getRoomsPy(props){
    var promisePy = apiHotelz.getRoomsPython(
      this.state.startDate,
      this.state.endDate,
      this.state.place,
      this.state.ammountPpl,
      this.state.roomType
    )
    var self = this
    promisePy.then(function(resolve) {
      console.log("@@@ ",resolve);
      if(resolve.data) {
        self.setState({roomsData: []})
        self.setState({roomsUnprocessedData: resolve.data})
        self.processRoomsData()
      }
    })
    .catch(function(error){
      console.log("@@@ ",error);
    })
    var data2 = apiHotelz.getRoomsGo(
      this.state.startDate,
      this.state.endDate,
      this.state.place,
      this.state.ammountPpl,
      this.state.roomType
    )
  }

  processRoomsData(props){
    if (this.state.roomsUnprocessedData) {
      this.state.roomsUnprocessedData.forEach(hotel => {
        hotel.rooms.forEach(room => {
          var roomItem = []
          roomItem.hotel_name = hotel.hotel_name
          roomItem.capacity = room.capacity
          roomItem.beds = room.beds
          roomItem.check_in = hotel.check_in
          roomItem.check_out = hotel.check_out
          roomItem.room_type = room.room_type
          roomItem.price = room.price
          roomItem.currency = room.currency
          roomItem.description = room.description
          roomItem.hotel_thumbnail = hotel.hotel_thumbnail
          roomItem.room_thumbnail = room.room_thumbnail
          this.state.roomsData.push(roomItem)
        });
      });
      console.log(this.state.roomsData);
    }
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
            <button onClick={this.getRoomsPy}>Buscar</button>
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
