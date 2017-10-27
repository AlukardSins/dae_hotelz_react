import axios from 'axios'
import SAMPLE_JSON_RESPONSE from './sampleJsonResponse';

const endpoints = {
  pythonEndpoint : "https://hotelz-python-api.herokuapp.com/V1/",
  goEndpoint : "https://udeain.herokuapp.com/api/v1/",
  nodeEndpoint : "https://api-hotelz-node.herokuapp.com/v1/",
  scalaEndpoint : "https://dezameron-api-dae.herokuapp.com/v1/",
  testMLURL         : "https://api.mercadolibre.com/sites/MCO/"
}

class ApiHotelzFunctions {

  getRooms(requestData) {

    return new Promise(function (resolve, reject) {
      console.log("1230", requestData.endpoint);
      var axiosInstance = axios.create({
        baseURL: requestData.endpoint
      })
      var getRoomsEndpoint = (requestData.endpoint === endpoints.pythonEndpoint) ? "rooms/" : "rooms";
      axiosInstance.get(getRoomsEndpoint, {
        params: {
          arrive_date: requestData.startDate,
          leave_date: requestData.endDate,
          city: requestData.place,
          hosts: requestData.amountPpl,
          room_type: requestData.roomType
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
