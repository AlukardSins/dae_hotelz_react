import React, { Component } from 'react';
import * as firebase from 'firebase'
import ApiHotelzFunctions from '../rest/apiHotelz'
import Modal from 'react-modal'
import numeral from 'numeral'


const apiHotelz = new ApiHotelzFunctions()

const AuthConfig = {
	apiKey:             "AIzaSyBPu2i5JN2L-THImOfA98EHnoj1M8j5mhw",
	authDomain:         "gohotels-5a589.firebaseapp.com",
	databaseURL:        "https://gohotels-5a589.firebaseio.com",
	projectId:          "gohotels-5a589",
	storageBucket:      "gohotels-5a589.appspot.com",
	messagingSenderId:  "827262016005"
};

/*AuthConfig = {
	apiKey: "AIzaSyAd-4uawI5519DXAP2LRH7hZLcQ_I-rAvM",
	authDomain: "hotelz-f3ff6.firebaseapp.com",
	databaseURL: "https://hotelz-f3ff6.firebaseio.com",
	projectId: "hotelz-f3ff6",
	storageBucket: "hotelz-f3ff6.appspot.com",
	messagingSenderId: "396826489759"
};
*/

const customStyles = {
	content : {
		top         : '50%',
		left        : '50%',
		right       : 'auto',
		bottom      : 'auto',
		marginRight : '-50%',
		width       : '50%',
		transform   : 'translate(-50%, -50%)',
		overflow		: 'auto',
		maxHeight	: '400px'
	}
};
class LoginHeader extends Component {
	constructor () {
		super()
		this.state = {
			user: null,
			token: '',
			modalRoom: [],
			modalIsOpen: false,
			reservations: []
		}
		firebase.initializeApp(AuthConfig);
		this.provider = new firebase.auth.GoogleAuthProvider();
	}

	componentDidMount() {

		this.setState({
			reservations: [
				{
					"hotel_name": "Dezameron",
					"reservation": [
						{
							"state": "A",
							"reserve_id": "00001",
							"arrive_date": "10-12-2017",
							"leave_date": "11-12-2017",
							"room": {
								"room_type": "lujosa",
								"capacity": 3,
								"price": "$483,908",
								"currency": "COP",
								"room_thumbnail": "http://www.hotelarielsoaxtepec.com/hotel3.jpg",
								"description": "Officia consectetur deserunt laborum elit velit velit excepteur laboris pariatur labore labore nisi ipsum. Et esse eiusmod nulla ad elit et fugiat nostrud aute ut. Officia ullamco et Lorem pariatur laboris. Elit non id laboris aliquip proident reprehenderit veniam in cupidatat aute in sunt eu. Consectetur anim qui aliquip consequat. Consequat veniam ipsum Lorem consectetur ad enim pariatur magna magna excepteur fugiat officia exercitation veniam. Esse sit irure cillum sunt consequat ipsum dolor ex magna occaecat aute non occaecat culpa.\r\n",
								"beds": {
									"simple": 2,
									"double": 2
								}
							}
						},
						{
							"state": "B",
							"reserve_id": "00002",
							"arrive_date": "20-01-2018",
							"leave_date": "25-02-2018",
							"room": {
								"room_type": "lujosa",
								"capacity": 3,
								"price": "$53,909",
								"currency": "COP",
								"room_thumbnail": "http://www.hotelarielsoaxtepec.com/hotel3.jpg",
								"description": "Officia consectetur deserunt laborum elit velit velit excepteur laboris pariatur labore labore nisi ipsum. Et esse eiusmod nulla ad elit et fugiat nostrud aute ut. Officia ullamco et Lorem pariatur laboris. Elit non id laboris aliquip proident reprehenderit veniam in cupidatat aute in sunt eu. Consectetur anim qui aliquip consequat. Consequat veniam ipsum Lorem consectetur ad enim pariatur magna magna excepteur fugiat officia exercitation veniam. Esse sit irure cillum sunt consequat ipsum dolor ex magna occaecat aute non occaecat culpa.\r\n",
								"beds": {
									"simple": 2,
									"double": 2
								}
							}
						}
					]
				},
				{
					"hotel_name": "UdeA-IN",
					"reservation": [
						{
							"state": "C",
							"reserve_id": "00001",
							"arrive_date": "10-12-2017",
							"leave_date": "11-12-2017",
							"room": {
								"room_type": "lujosa",
								"capacity": 3,
								"price": "$483,908",
								"currency": "COP",
								"room_thumbnail": "http://www.hotelarielsoaxtepec.com/hotel3.jpg",
								"description": "Officia consectetur deserunt laborum elit velit velit excepteur laboris pariatur labore labore nisi ipsum. Et esse eiusmod nulla ad elit et fugiat nostrud aute ut. Officia ullamco et Lorem pariatur laboris. Elit non id laboris aliquip proident reprehenderit veniam in cupidatat aute in sunt eu. Consectetur anim qui aliquip consequat. Consequat veniam ipsum Lorem consectetur ad enim pariatur magna magna excepteur fugiat officia exercitation veniam. Esse sit irure cillum sunt consequat ipsum dolor ex magna occaecat aute non occaecat culpa.\r\n",
								"beds": {
									"simple": 2,
									"double": 2
								}
							}
						},
						{
							"state": "B",
							"reserve_id": "00002",
							"arrive_date": "20-01-2018",
							"leave_date": "25-02-2018",
							"room": {
								"room_type": "lujosa",
								"capacity": 3,
								"price": "$53,909",
								"currency": "COP",
								"room_thumbnail": "http://www.hotelarielsoaxtepec.com/hotel3.jpg",
								"description": "Officia consectetur deserunt laborum elit velit velit excepteur laboris pariatur labore labore nisi ipsum. Et esse eiusmod nulla ad elit et fugiat nostrud aute ut. Officia ullamco et Lorem pariatur laboris. Elit non id laboris aliquip proident reprehenderit veniam in cupidatat aute in sunt eu. Consectetur anim qui aliquip consequat. Consequat veniam ipsum Lorem consectetur ad enim pariatur magna magna excepteur fugiat officia exercitation veniam. Esse sit irure cillum sunt consequat ipsum dolor ex magna occaecat aute non occaecat culpa.\r\n",
								"beds": {
									"simple": 2,
									"double": 2
								}
							}
						}
					]
				}
			]
		})
	}

	login () {
		let self = this;
		firebase.auth().signInWithPopup(this.provider).then(function(result) {
			let user = result.user;
			let token = result.credential.accessToken;
			console.log(user);
			if (token)
				self.setState({user: user, token: token})
		}).catch(function(error) {
			let errorCode = error.code;
			let email = error.email;
			if (errorCode != 'auth/popup-closed-by-user')
				alert('No se pudo realizar el login: ' + errorCode);
		});

	}

	logout() {
		let self = this;
		firebase.auth().signOut().then(function() {
			self.setState({user: null})
		}).catch(function(error) {
			var errorCode = error.code;
			alert('No se pudo cerrar la sesión: ' + errorCode);
		});
	}

	listReserves() {
		let self = this

		let promiseGo = apiHotelz.getReserves(apiHotelz.endpoints.dev.goEndpoint, this.state.token)
		let promisePython = apiHotelz.getReserves(apiHotelz.endpoints.dev.pythonEndpoint, this.state.token)
		let promiseNode = apiHotelz.getReserves(apiHotelz.endpoints.dev.nodeEndpoint, this.state.token)
		let promiseScala = apiHotelz.getReserves(apiHotelz.endpoints.dev.scalaEndpoint, this.state.token)

		Promise.all([promisePython, promiseGo, promiseNode, promiseScala])
		.then(values => {
		})
			self.setState({modalIsOpen : true})
	}
	showRoomModal(room){
		this.setState({modalIsOpen : true})
		this.setState({modalRoom: room})
	}

	closeModal(props){
		this.setState({modalIsOpen : false})
		this.setState({modalRoom: []})
	}

	getActiveText(case_) {
		switch(case_)
		{
			case 'A':
				return 'Reserva activa';
				break;
			case 'B':
				return 'Reserva cancelada';
				break;
			case 'C':
				return 'Reserva ya caducada';
				break;
		}
	}

	render() {
		let sesionButton;
		let self = this
		console.log(this.state.reservations)

		if (this.state.user != null)
			sesionButton =
				<div>
					Bienvenido, {this.state.user.displayName}
					<button onClick={this.listReserves.bind(this)}>Listar Reservas</button>
					<button onClick={this.logout.bind(this)}>Salir</button>
				</div>
		else
			sesionButton =
			<div>
				<button onClick={this.login.bind(this)}>Iniciar Sesión</button>
				<button onClick={this.showRoomModal.bind(this)}>Modal</button>
			</div>
		return (
			<div className="LoginHeader">
				<div className="App-header-btns">
					{sesionButton}
				</div>

				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal.bind(this)}
					style={customStyles}
					contentLabel="Modal reservation"
					>
						<div className="overflow">
						{this.state.reservations.map(function(reservation, key){
							return (
									reservation.reservation.map(function(data, key2){
										return (
											<div className="Room-Card-Wrapper">
												<div key={key2} className="Room-Card">
													<div className="Room-Images">
														<img src={data.room.room_thumbnail}/>
														<img src={data.room.hotel_thumbnail}/>
													</div>
													<br/>
													<label className="hotel_name">{reservation.hotel_name}</label>
													<label className="">{self.getActiveText(data.state)}</label>
													<label className="">{data.reserve_id}</label>
													<label className="">{data.arrive_date}</label>
													<label className="">{data.leave_date}</label>
													<label className="currency">{numeral(data.room.price).format('0,0')} {data.room.currency}</label>
												</div>
											</div>
										)
									})
							)
						})}
						</div>
				</Modal>
			</div>
		)
	}
}

export default LoginHeader;
