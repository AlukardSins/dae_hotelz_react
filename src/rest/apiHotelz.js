import axios from 'axios'
import SAMPLE_JSON_RESPONSE from './sampleJsonResponse';

const endpoints = {
  pythonEndpoint    : "www.pythonendpoint.edu/api/",
  goEndpoint        : "www.goendpoint.edu/api/",
  nodeEndpoint      : "www.nodeendpoint.edu/api/",
  scalaEndpoint     : "www.scalaendpoint.edu/api/",
  testMLURL         : "https://api.mercadolibre.com/sites/MCO/"
}

class ApiHotelzFunctions {

  constructor(){
    this.data = {
      roomsPython: ['']
    }
  }

  getRooms(apiUrl, initDate, endDate, place, amountPpl, roomType) {
    var self = this
    return new Promise(function (resolve, reject) {
      // var axiosInstance = axios.create({
      //   baseURL: pythonEndpoint
      // })
      // axiosInstance.get(pythonEndpoint+"v1/rooms", {
      //   params: {
      //     arrive_date: initDate,
      //     leave_date: endDate,
      //     city: place,
      //     hosts: amountPpl,
      //     room_type: roomType
      //   }
      // })
      var axiosInstance = axios.create({
        baseURL: apiUrl
      })
      axiosInstance.get('search',{
        params: {
          search: "casa"
        }
      })
      .then(function (response) {
        if(response.status !== 200){
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        resolve(SAMPLE_JSON_RESPONSE) /* Change */
      })
      .catch(function (error) {
        reject(error)
      })
    })

  }
}
export default ApiHotelzFunctions;
