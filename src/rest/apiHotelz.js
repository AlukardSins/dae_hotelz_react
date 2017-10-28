import axios from 'axios'

const endpoints = {
  pythonEndpoint : "https://hotelz-python-api.herokuapp.com/V1/",
  goEndpoint : "https://udeain.herokuapp.com/api/v1/",
  nodeEndpoint : "https://api-hotelz-node.herokuapp.com/v1/",
  scalaEndpoint : "https://dezameron-api-dae.herokuapp.com/v1/"
}

class ApiHotelzFunctions {

  getRooms(endpoint, requestData) {
    return new Promise(function (resolve, reject) {
      var axiosInstance = axios.create({
        baseURL: endpoint
      })
      var getRoomsEndpoint = (endpoint === endpoints.pythonEndpoint) ? "rooms/" : "rooms";
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
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
    })

  }

  reservateRoom(endpoint, requestData) {
    axios.post(endpoint+'/rooms/reserve', {
      arrive_date: requestData.arrive_date,
      leave_date: requestData.leave_date,
      room_type: requestData.room_type,
      capacity: requestData.capacity,
      beds: requestData.beds,
      hotel_id: requestData.hotel_id,
      user: requestData.userData
    })
    .then(function (response) {
      console.log(response);
      return response
    })
    .catch(function (error) {
      console.log(error);
      return error
    });
  }
}
export default ApiHotelzFunctions;
