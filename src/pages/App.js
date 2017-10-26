import React, { Component } from 'react';
import logoicon from '../images/appIcon.png';
import logotext from '../images/hotelz_logo.png';
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
      if(resolve.data) {
        self.state.roomsData = []
        self.setState({roomsUnprocessedData: resolve.data})
        self.processRoomsData()
      }
    })
    .catch(function(error){
      alert("An error has ocurried, see console for error log.")
      console.log("@@@ ",error);
    })
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
    }
    this.forceUpdate()
  }

  cardsScheme() {
    var rooms = this.state.roomsData
    if (rooms) {
      console.log("Loading...");
      console.log(rooms);
      var listRooms = rooms.map(function(room) {
        return (
          <div className="Room-Card">
            <div className="Room-Images">
              <img src={room.hotel_thumbnail}/>
              <br/>
              <img src={room.room_thumbnail}/>
            </div>
            <label>{room.hotel_name}</label> <br/>
            <label>{room.capacity} personas</label> <br/>
            <label>{room.beds.double} camas dobles {room.beds.simple} camas sencillas</label> <br/>
            <label>Check in: {room.check_in}</label> <br/>
            <label>Check out: {room.check_out}</label> <br/>
            <label>Descripción: {room.description}</label> <br/>
            <label>Tipo de habitación: {room.room_type}</label> <br/>
            <label>{room.price} {room.currency}</label> <br/>
            <button>Reservar</button>
          </div>
        )
      })
      return (
        <div>{listRooms}</div>
      )
    } else {
      console.log("Error on loading cards");
      return(
        <div>Empty</div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logoicon} className="App-logo" alt="logo" />
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
          {this.cardsScheme()}
        </div>
        <div className="App-footer">
          <div className="footer-text">
            <a>hotelz s.l. Todos los derechos reservados 2017 Medellín, Antioquia</a><img src={logotext}/><a>.com</a>
          </div>
          <table className="footer-colors">
            <tbody>
              <tr>
                <th id="orange"/>
                <th id="red"/>
                <th id="pink"/>
                <th id="darkBlue"/>
                <th id="blue"/>
                <th id="green"/>
                <th id="yellow"/>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
