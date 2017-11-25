import React, { Component } from 'react';
import * as firebase from 'firebase'

const /*AuthConfig = {
	apiKey:             "AIzaSyBPu2i5JN2L-THImOfA98EHnoj1M8j5mhw",
	authDomain:         "gohotels-5a589.firebaseapp.com",
	databaseURL:        "https://gohotels-5a589.firebaseio.com",
	projectId:          "gohotels-5a589",
	storageBucket:      "gohotels-5a589.appspot.com",
	messagingSenderId:  "827262016005"
};*/

AuthConfig = {
	apiKey: "AIzaSyAd-4uawI5519DXAP2LRH7hZLcQ_I-rAvM",
	authDomain: "hotelz-f3ff6.firebaseapp.com",
	databaseURL: "https://hotelz-f3ff6.firebaseio.com",
	projectId: "hotelz-f3ff6",
	storageBucket: "hotelz-f3ff6.appspot.com",
	messagingSenderId: "396826489759"
};

class Auth extends Component {
	constructor () {
		super()
		this.state = { name: 'Pepe' }
		firebase.initializeApp(AuthConfig);
	}

	componentDidMount() {
		//const dbRef = firebase.database().ref().child('object').child('name')
		this.provider = new firebase.auth.GoogleAuthProvider();
	}
	login () {
		firebase.auth().signInWithPopup(this.provider).then(function(result) {
			var user = result.user;
			console.log(user.email);
		}).catch(function(error) {
			var errorCode = error.code;
			var email = error.email;
			if (errorCode != 'auth/popup-closed-by-user')
				alert('No se pudo realizar el login.');
		});

	}

	logout() {
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
		}).catch(function(error) {
			// An error happened.
		});
	}

	render() { return (
		<div>
			<div>puto: {this.state.name}</div>
			<button className="btn" onClick={this.login.bind(this)}>Login</button>
		</div>
	)}
}

export default Auth;