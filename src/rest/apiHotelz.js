import axios from 'axios'

const pythonEndpoint = "www.pythonendpoint.edu/api/"
const goEndpoint = "www.goendpoint.edu/api/"
const nodeEndpoint = "www.nodeendpoint.edu/api/"
const scalaEndpoint = "www.scalaendpoint.edu/api/"

const testMLURL = "https://api.mercadolibre.com/sites/MCO/"

class ApiHotelzFunctions {

  constructor(){
    this.data = {
      roomsPython: ['']
    }
  }

  setState
  getRoomsPython(initDate, endDate, place, amountPpl, roomType) {
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
        baseURL: testMLURL
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
        resolve(
          {
            "data":[
              {
                "hotel_id":"1",
                "hotel_name":"Freezers",
                "hotel_location":{
                  "address":"Norte del polo norte",
                  "lat":"123,45",
                  "long":"678,90"
                },
                "hotel_thumbnail":"https://authentic-scandinavia.com/system/images/tours/photos/91/thumbnail.jpg?1318325058",
                "check_in":"2pm",
                "check_out":"12m",
                "hotel_website":"www.google.com",
                "rooms":[
                  {
                    "room_type":"premium",
                    "capacity":2,
                    "price":250000,
                    "currency":"COP",
                    "room_thumbnail":"https://authentic-scandinavia.com/system/images/tours/photos/107/thumbnail.jpg?1321353035",
                    "description":"This is a cool room",
                    "beds":{
                      "simple":2,
                      "double":0
                    }
                  },
                  {
                    "room_type":"premium",
                    "capacity":2,
                    "price":200000,
                    "currency":"COP",
                    "room_thumbnail":"https://authentic-scandinavia.com/system/images/tours/photos/107/thumbnail.jpg?1321353035",
                    "description":"This is a second cool room",
                    "beds":{
                      "simple":0,
                      "double":1
                    }
                  }
                ]
              },
              {
                "hotel_id":"2",
                "hotel_name":"GrvHotel",
                "hotel_location":{
                  "address":"Groove St",
                  "lat":"123,45",
                  "long":"678,90"
                },
                "hotel_thumbnail":"https://vignette.wikia.nocookie.net/gtawiki/images/2/2d/Groves_Tag.png/revision/latest?cb=20130503102942",
                "check_in":"4pm",
                "check_out":"9am",
                "hotel_website":"www.youtube.com",
                "rooms":[
                  {
                    "room_type":"regular",
                    "capacity":5,
                    "price":50000,
                    "currency":"COP",
                    "room_thumbnail":"https://vignette.wikia.nocookie.net/gtawiki/images/c/ca/Beta_Grove_street_guy.jpg/revision/latest/scale-to-width-down/256?cb=20130110061221",
                    "description":"Groove4Life",
                    "beds":{
                      "simple":1,
                      "double":2
                    }
                  },
                  {
                    "room_type":"premium",
                    "capacity":4,
                    "price":40000,
                    "currency":"COP",
                    "room_thumbnail":"https://i.ytimg.com/vi/8xZoH0QNqHg/hqdefault.jpg",
                    "description":"Groove4LifeSecond",
                    "beds":{
                      "simple":0,
                      "double":2
                    }
                  }
                ]
              }
            ]}
          )
        // resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
    })

  }

  getRoomsGo(initDate, endDate, place, ammountPpl, roomType) {
    return pythonEndpoint
  }
}
export default ApiHotelzFunctions;
