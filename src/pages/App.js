import React, { Component } from 'react';
import logoicon from '../images/appIcon.png';
import logotext from '../images/hotelz_logo.png';
import './App.css';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-select/dist/react-select.css';
import ApiHotelzFunctions from '../rest/apiHotelz'
import moment from 'moment'
import Select from 'react-select'
import numeral from 'numeral'

const apiHotelz = new ApiHotelzFunctions()

const endpoints = {
  pythonEndpoint : "https://hotelz-python-api.herokuapp.com/V1/",
  goEndpoint     : "https://udeain.herokuapp.com/api/v1/",
  nodeEndpoint   : "https://api-hotelz-node.herokuapp.com/v1/",
  scalaEndpoint  : "https://dezameron-api-dae.herokuapp.com/v1/",
  testMLURL      : "https://api.mercadolibre.com/sites/MCO/"
}

const cityOptions = [
  { value: "05001", label: "Medellín" },
  { value: "11001", label: "Bogotá" }
];
const typeOptions = [
  { value: 'S', label: "Sencilla" },
  { value: 'L', label: "Lujosa" }
];

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiUrl: '',
      startDate: '',
      endDate: '',
      place: '',
      amountPpl: '0',
      roomType: 'L',
      roomsUnprocessedData: [''],
      roomsData: [],
      fieldsErrorMessage : '',
      clearable: false
    }
    this.getRooms = this.getRooms.bind(this)
    this.processRoomsData = this.processRoomsData.bind(this)
    this.validData = this.validData.bind(this)
    this.cityChange = this.cityChange.bind(this)
    this.typeChange = this.typeChange.bind(this)
    this.amountPplChange = this.amountPplChange.bind(this)
  }
  state = {
    selectedStartDay: undefined,
    selectedEndDay: undefined,
    isDisabled: false
  }

  cityChange(val) {
    if (val)
      this.setState({place: val.value})
  }
  typeChange(val) {
    this.setState({roomType: val.value})
  }
  amountPplChange(val) {
    console.log(val.target.value);
    this.setState({amountPpl: val.target.value})
  }

  validData(props){
      this.setState({fieldsErrorMessage: ''})
    if (
      !this.state.startDate ||
      !this.state.endDate
    ) {
      this.setState({fieldsErrorMessage: 'Por favor llene todos los campos'})
      return false
    } else if (isNaN(this.state.amountPpl)) {
      this.setState({fieldsErrorMessage: 'Por favor ingrese un número de personas numérico'})
      return false;
    }
    return true
  }

  getRooms(props) {
    if(!this.validData()){
      return;
    }
    var requestData = {
      startDate: moment(this.state.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.state.endDate).format("YYYY-MM-DD"),
      place: this.state.place,
      amountPpl: this.state.amountPpl,
      roomType: this.state.roomType
    }

    var promiseGo = apiHotelz.getRooms(endpoints.goEndpoint, requestData)
    var promisePython = apiHotelz.getRooms(endpoints.pythonEndpoint, requestData)
    var promiseNode = apiHotelz.getRooms(endpoints.nodeEndpoint, requestData)
    var promiseScala = apiHotelz.getRooms(endpoints.scalaEndpoint, requestData)

  //   var self = this
  //   promisePython.then(function(resolve) {
  //     if(resolve.data) {
  //       self.state.roomsData = []
  //       self.setState({roomsUnprocessedData: resolve.data})
  //       self.processRoomsData()
  //     }
  //   })
  //   .catch(function(error){
  //     alert("An error has ocurried, see console for error log.")
  //     console.log("@@@ ",error);
  //   })
    var self = this
    Promise.all([promisePython, promiseGo, promiseNode, promiseScala])
    .then(values => {
      console.log(values);
      if (values) {
        self.state.roomsData = []
        self.setState({roomsUnprocessedData: values})
        self.processRoomsData()
      }
    })
    // .catch(function(error){
    //   console.warn("Error loading rooms");
    // })
  }

  processRoomsData(props){
    if (this.state.roomsUnprocessedData) {
      this.state.roomsUnprocessedData.forEach(hotel => {
        hotel.data.rooms.forEach(room => {
          var roomItem = []
          roomItem = room
          roomItem.hotel_name = hotel.data.hotel_name
          roomItem.hotel_thumbnail = hotel.data.hotel_thumbnail
          roomItem.check_in = hotel.data.check_in
          roomItem.check_out = hotel.data.check_out
          this.state.roomsData.push(roomItem)
        });
      });
    }
    this.forceUpdate()
  }

  cardsScheme() {
    var rooms = this.state.roomsData
    if (rooms) {
      var listRooms = rooms.map(function(room, key) {
        return (
          <div>
          <div key={key} className="Room-Card">
            <div className="Room-Images">
              <img src={room.hotel_thumbnail}/>
              <br/>
              <img src={room.room_thumbnail}/>
            </div>
            <label className="hotel_name">{room.hotel_name}</label>
            <label className="description">{room.description}</label>
            <label className="capacity">{room.capacity}</label>
            <label className="beds">
              <span className="beds-single">{room.beds.simple}</span>
              <span className="beds-double">{room.beds.double}</span>
            </label>
            <label className="check_in">Check in: {room.check_in}</label>
            <label className="check_out">Check out: {room.check_out}</label>
            <label className="room_type">{room.room_type=='L'?'si':'no'}</label>
            <label className="currency">{numeral(room.price).format('0,0')} {room.currency}</label>
            <button className="btn">Reservar</button>
          </div>
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
            <div className="input-field">
              <DateRangePicker
                endDatePlaceholderText="Salida"
                startDatePlaceholderText="Entrada"
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                displayFormat="YYYY-MM-DD"
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              />
            </div>

            <div className="input-field">
              <label>Lugar </label>
              <Select
                className="select-react-custom"
                name="city-name"
                defaultValue="05001"
                options={cityOptions}
                placeholder = "-- Seleccione --"
                value={this.state.place}
                onChange={this.cityChange}>
              </Select>
            </div>

            <div className="input-field">
              <label># personas </label>
              <input className="amount-ppl-input" type="number" min="0" step="1" max="30" value={this.state.amountPpl} onChange={this.amountPplChange}></input>
            </div>

            <div className="input-field">
              <label>Tipo </label>
              <Select
                name="room-type"
                className="select-react-custom"
                defaultValue="S"
                options={typeOptions}
                clearable={this.state.clearable}
                value={this.state.roomType}
                onChange={this.typeChange}>
              </Select>
            </div>
            <br/>
            <button className="btn" onClick={this.getRooms}>Buscar</button>

            <div className="input-field fieldsErrorMessage">
              <label className="fieldsErrorMessage">{this.state.fieldsErrorMessage}</label>
            </div>
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
