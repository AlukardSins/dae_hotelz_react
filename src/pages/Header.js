import React, { Component } from 'react';
import logoicon from '../images/appIcon.png';
import LoginHeader from './LoginHeader';

class Header extends Component {
	render() { return (
		<div className="Header App-header">
			<img src={logoicon} className="App-logo" alt="logo" />
			<div className="App-title">
				<div id="divTitle">
					<a1>Hotelz</a1><a2>.com</a2>
				</div>
			</div>
			<LoginHeader />
		</div>
	)}
}

export default Header;