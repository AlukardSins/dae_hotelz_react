import axios from 'axios'

class ApiHotelzFunctions {

  constructor() {
    this.endpoints = {}
    this.endpoints.prod = {
      pythonEndpoint : "https://hotelz-python-api.herokuapp.com/V1/",
      goEndpoint : "https://udeain.herokuapp.com/api/v1/",
      nodeEndpoint : "https://apihotelz-dev.herokuapp.com/v1/",
      scalaEndpoint : "https://dezameron-api-dae.herokuapp.com/v1/"
    }
    this.endpoints.dev = {
      pythonEndpoint : "https://hotelz-python-api.herokuapp.com/V1/",
      goEndpoint : "https://udeain-dev.herokuapp.com/api/v1/",
      nodeEndpoint : "https://apihotelz-dev.herokuapp.com/v1/",
      scalaEndpoint : "https://dev-dezameron-api-dae.herokuapp.com/v1/"
    }
  }

  getRooms(endpoint, requestData) {
    let self = this;
    return new Promise(function (resolve, reject) {
      var axiosInstance = axios.create({
        baseURL: endpoint
      })
      var getRoomsEndpoint = (endpoint === self.endpoints.pythonEndpoint) ? "rooms/" : "rooms";
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

  getReserves(endpoint, token) {
    let self = this;
    return new Promise(function (resolve, reject) {
      var axiosInstance = axios.create({
        baseURL: endpoint,
        headers: {
          'Authorization': 'Bearer' + token,
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      var getRoomsEndpoint = (endpoint === self.endpoints.pythonEndpoint) ? "reservations/" : "reservations";
      axiosInstance.get(getRoomsEndpoint)
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
    return new Promise(function (resolve, reject) {
      var axiosInstance = axios.create({
        baseURL: endpoint
      })
      axiosInstance.post('rooms/reserve', {
        arrive_date: requestData.arrive_date,
        leave_date: requestData.leave_date,
        room_type: requestData.room_type,
        capacity: requestData.capacity,
        beds: requestData.beds,
        hotel_id: requestData.hotel_id,
        user: requestData.userData
      })
      .then(function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
    })
    // axios.post(endpoint+'rooms/reserve', {
    //   arrive_date: requestData.arrive_date,
    //   leave_date: requestData.leave_date,
    //   room_type: requestData.room_type,
    //   capacity: requestData.capacity,
    //   beds: requestData.beds,
    //   hotel_id: requestData.hotel_id,
    //   user: requestData.userData
    // })
    // .then(function (response) {
    //   console.log(response);
    //   return response
    // })
    // .catch(function (error) {
    //   console.log(error);
    //   return error
    // });
  }
}
export default ApiHotelzFunctions;
