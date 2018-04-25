import React from 'react';
import axios from 'axios';
import UserSearch from '../search/user-search/user-search.jsx';
import DirectChat from '../directchat/directchat.jsx';
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
	}
	
	render() {
		const msgUser = (this.state.msgUser === '') ? 'Search for a user' : `Messaging: ${this.state.msgUser}`;
		return (
			<div>
				<div id='header'>
					<span id='header-title'>Direct Message</span>
				</div>
				<hr/>
				<div id='direct-message-box'>
					<span id='direct-user-message'>{msgUser}</span>
				</div>
				<div className='row'>
					<div className='col-7' id='user-direct-chat'>
						<DirectChat selectedUser={this.state.msgUser}/>
					</div>
					<div className='col-3' id='user-dropdown'>
						<UserSearch selectedUser={this.selectedUser}/>
					</div>
				</div>
			</div>
		);
	}
}