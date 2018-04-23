import React from 'react';
import axios from 'axios';
import UserSearch from '../search/user-search/user-search.jsx';
import './direct.css';

export default class DirectMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			msgUser: ''
		};
		this.selectedUser = this.selectedUser.bind(this);
	}
	
	selectedUser(username) {
		this.setState({
			msgUser: username
		});
		console.log(username);
	}
	
	render() {
		return (
			<div>
				<div id='header'>
					<span id='header-title'>Direct Message</span>
				</div>
				<hr/>
				<div id='user-dropdown'>
					<UserSearch selectedUser={this.selectedUser}/>
				</div>
			</div>
		);
	}
}