import React, { Component } from 'react';
import logo from '../images/appIcon.png';
import './App.css';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import apiHotelz from '../rest/apiHotelz.js'

const DAY_FORMAT = 'DD/MM/YYYY';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      startDate: '',
      endDate: '',
      place: '',
      ammountPpl: '',
      roomType: ''
    }
    this.getRoomsPy = this.getRoomsPy.bind(this)
  }
  state = {
    selectedStartDay: undefined,
    selectedEndDay: undefined,
    isDisabled: false
  }

  handleStartDayChange = (selectedStartDay, modifiers) => {
    this.setState({
      selectedStartDay,
      isDisabled: modifiers.disabled,
    });
  };
  handleEndDayChange = (selectedEndDay, modifiers) => {
    this.setState({
      selectedEndDay,
      isDisabled: modifiers.disabled,
    });
  };

  getRoomsPy(props){
    var data = apiHotelz.getRoomsPython(
      this.state.startDate,
      this.state.endDate,
      this.state.place,
      this.state.ammountPpl,
      this.state.roomType
    )
    console.log("@@@ ",data);
  }

  render() {
    const { selectedStartDay, selectedEndDay, isDisabled } = this.state;
    const formattedStartDay = selectedStartDay
      ? moment(selectedStartDay).format(DAY_FORMAT)
      : '';
    const formattedEndDay = selectedEndDay
      ? moment(selectedEndDay).format(DAY_FORMAT)
      : '';
    const dayPickerProps = {
      todayButton: 'Go to Today',
      disabledDays: {
        daysOfWeek: [0, 6],
      },
      enableOutsideDays: true,
      modifiers: {
        monday: { daysOfWeek: [1] },
      },
    };

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
            <table className="dates-table">
              <tr>
                <tx>
                  <label>Fecha inicio </label>
                </tx>
                <tx>
                  <label>Fecha fin </label>
                </tx>
              </tr>
              <tr>
                <tx>
                  <DayPickerInput
                    value={formattedStartDay}
                    onDayChange={this.handleStartDayChange}
                    format={DAY_FORMAT}
                    placeholder={`E.g. ${moment().locale('en').format(DAY_FORMAT)}`}
                    dayPickerProps={dayPickerProps}/>
                  </tx>
                <tx>
                  <DayPickerInput
                    value={formattedEndDay}
                    onDayChange={this.handleEndDayChange}
                    format={DAY_FORMAT}
                    placeholder={`E.g. ${moment().locale('en').format(DAY_FORMAT)}`}
                    dayPickerProps={dayPickerProps}/>
                </tx>
              </tr>
            </table>
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
