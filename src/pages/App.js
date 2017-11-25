import React, { Component } from 'react';
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
import Modal from 'react-modal'

// import Auth from './Auth';
import Header from './Header';

const apiHotelz = new ApiHotelzFunctions()

const endpoints = {
  pythonEndpoint : "https://hotelz-python-api.herokuapp.com/V1/",
  goEndpoint     : "https://udeain.herokuapp.com/api/v1/",
  nodeEndpoint   : "https://api-hotelz-node.herokuapp.com/v1/",
  scalaEndpoint  : "https://dezameron-api-dae.herokuapp.com/v1/"
}

const cityOptions = [
  { value: "05001", label: "Medellín" },
  { value: "11001", label: "Bogotá" }
];
const typeOptions = [
  { value: 'S', label: "Sencilla" },
  { value: 'L', label: "Lujosa" }
];
const docTypeOptions = [
  { value: 'Cédula de ciudadanía', label: "C.C." },
  { value: 'Cédula de extranjería', label: "C.E." },
  { value: 'NIT', label: "NIT" },
  { value: 'Pasaporte', label: "Pasaporte" }
];

const customStyles = {
  content : {
    top         : '50%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    width       : '50%',
    transform   : 'translate(-50%, -50%)'
  }
};

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiUrl: '',
      startDate: '',
      endDate: '',
      place: '',
      amountPpl: '1',
      roomType: 'L',
      roomsUnprocessedData: [''],
      roomsData: [],
      fieldsErrorMessage : '',
      clearable: false,
      modalRoom: [],
      userReservationData: {},
      modalIsOpen: false,
      reservationMessage: ''
    }
    this.getRooms = this.getRooms.bind(this)
    this.processRoomsData = this.processRoomsData.bind(this)
    this.validData = this.validData.bind(this)
    this.cityChange = this.cityChange.bind(this)
    this.typeChange = this.typeChange.bind(this)
    this.amountPplChange = this.amountPplChange.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.reservateRoom = this.reservateRoom.bind(this)
    this.userDocTypeChange = this.userDocTypeChange.bind(this)
    this.userDocumentChange = this.userDocumentChange.bind(this)
    this.userEmailChange = this.userEmailChange.bind(this)
    this.userPhoneChange = this.userPhoneChange.bind(this)
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
    this.setState({amountPpl: val.target.value})
  }

  userDocTypeChange(val) {
    var resData = this.state.userReservationData
    resData.doc_type = val.value
    this.setState({userReservationData: resData})
  }

  userDocumentChange(val) {
    var resData = this.state.userReservationData
    resData.doc_id = val.target.value
    this.setState({userReservationData: resData})
  }

  userEmailChange(val) {
    var resData = this.state.userReservationData
    resData.email = val.target.value
    this.setState({userReservationData: resData})
  }

  userPhoneChange(val) {
    var resData = this.state.userReservationData
    resData.phone_number = val.target.value
    this.setState({userReservationData: resData})
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

  reservateRoom(props){
    var reservateData = this.state.modalRoom
    reservateData.userData = this.state.userReservationData
    this.setState({modalRoom: reservateData})
    var postData = this.state.modalRoom
    postData.arrive_date = moment(this.state.startDate).format("YYYY-MM-DD")
    postData.leave_date = moment(this.state.endDate).format("YYYY-MM-DD")
    var endpointRes
    switch (this.state.modalRoom.hotel_name) {
      case "udeain medellin":
        endpointRes = endpoints.goEndpoint
        break;
      case "Dann Cartón":
        endpointRes = endpoints.nodeEndpoint
        break;
      case "Dezameron":
        endpointRes = endpoints.scalaEndpoint
        break;
      case "Colombia Resort Spring":
        endpointRes = endpoints.pythonEndpoint
        break;
      default:

    }
    console.log(this.state.modalRoom);

    var responseReservate = apiHotelz.reservateRoom(endpointRes, this.state.modalRoom)
    var self = this
    Promise.all([responseReservate])
    .then(values => {
      self.closeModal()
      if (values) {
        alert("La habitación fue reservada con el código: \n"+ values[0].data.reservation_id)
      }
    })
    .catch(function(error){
      alert("Ocurrió un error al reservar, intente nuevamente")
    })
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

    var self = this
    Promise.all([promisePython, promiseGo, promiseNode, promiseScala])
    .then(values => {
      if (values) {
        self.state.roomsData = []
        self.setState({roomsUnprocessedData: values})
        self.processRoomsData()
      }
    })
  }

  processRoomsData(props){
    if (this.state.roomsUnprocessedData) {
      this.state.roomsUnprocessedData.forEach(hotel => {
        hotel.data.rooms.forEach(room => {
          var roomItem = []
          roomItem = room
          roomItem.hotel_id = hotel.data.hotel_id
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

  showRoomModal(room){
    this.setState({modalIsOpen : true})
    this.setState({modalRoom: room})
  }

  closeModal(props){
    this.setState({modalIsOpen : false})
    this.setState({modalRoom: []})
  }

  cardsScheme() {
    var rooms = this.state.roomsData
    var self = this
    if (rooms) {
      var listRooms = rooms.map(function(room, key) {
        return (
          <div className="Room-Card-Wrapper" onClick={self.showRoomModal.bind(self, room)}>
            <div key={key} className="Room-Card">
              <div className="Room-Images">
                <img src={room.room_thumbnail}/>
                <img src={room.hotel_thumbnail}/>
              </div>
              <br/>
              <label className="hotel_name">{room.hotel_name}</label>
              <label className="currency">{numeral(room.price).format('0,0')} {room.currency}</label>
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
        <Header />
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
              <input className="amount-ppl-input" type="number" min="1" step="1" max="30" value={this.state.amountPpl} onChange={this.amountPplChange}></input>
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
          <div className="Rooms-Cards">
            {this.cardsScheme()}
          </div>
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
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal reservation"
          >
          <div className="Room-Card" id="Modal-Room">
            <div className="Modal-Images">
              <img src={this.state.modalRoom.hotel_thumbnail}/>
              <br/>
              <img src={this.state.modalRoom.room_thumbnail}/>
            </div>
            <label className="hotel_name" tooltip={this.state.modalRoom.hotel_name}>
              {this.state.modalRoom.hotel_name}
            </label>
            <label className="capacity">Capacidad: {this.state.modalRoom.capacity} persona(s)</label>
            <label className="check_in">Check in: {this.state.modalRoom.check_in}</label>
            <label className="check_out">Check out: {this.state.modalRoom.check_out}</label>
            <label className="room_type">Tipo de habitación: {this.state.modalRoom.room_type=='L'?'Lujosa':'Sencilla'}</label>
            <label className="currency">{numeral(this.state.modalRoom.price).format('0,0')} {this.state.modalRoom.currency}</label>
            <label className="description">Descripción: {this.state.modalRoom.description}</label>
            <div className="modal_user_data">
              <div className="modal-data-table">
                <table className="reservation-form">
                  <tr>
                    <td><label className="user_doctype">Tipo de documento: </label></td>

                    <td><div className="input-field">
                      <Select
                        name="document-type"
                        className="select-react-custom-modal"
                        defaultValue="C.C."
                        options={docTypeOptions}
                        clearable={this.state.clearable}
                        value={this.state.userReservationData.doc_type}
                        onChange={this.userDocTypeChange}>
                      </Select>
                    </div></td>
                    <td><label className="user_document">Documento: </label></td>
                    <td><input onChange={this.userDocumentChange}/></td>
                  </tr>
                  <tr>
                    <td><label className="user_email">Email: </label></td>
                    <td><input onChange={this.userEmailChange}/></td>
                    <td><label className="user_phone">Teléfono: </label></td>
                    <td><input onChange={this.userPhoneChange}/></td>
                  </tr>
                  <tr>
                  <td/>
                    <td>
                      <button className="btn" onClick={this.closeModal}>Cancelar</button>
                    </td>
                    <td>
                      <button className="btn" onClick={this.reservateRoom}>Reservar</button>
                    </td>
                    <td/>
                  </tr>
                </table>
              </div>
              <div className="clear"></div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
