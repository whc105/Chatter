import React from 'react';
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
		return (
			<div>
				<div id='header'>
					<span id='header-title'>Direct Message</span>
				</div>
				<hr/>
				<span>{this.state.msgUser}</span>
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