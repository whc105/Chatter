import React from 'react';
import axios from 'axios';
import JoinRoom from '../room-entry/join-room/join-room.jsx';
import LeaveRoom from '../room-entry/leave-room/leave-room.jsx';
import ChatBox from '../chatbox/chatbox.jsx';
import './room.css';

export default class Room extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roomData: []
		};
		this.renderNewList = this.renderNewList.bind(this);
	}
	
	componentWillMount() {
		axios.get('/api/getRoom', {
			params: {
				id: this.props.match.params.id
			}
		}).then(({data})=> {
			this.setState({roomData: data});
		});
	}
	
	generateUserList() {
		const roomUsers = (this.state.roomData.users) ? this.state.roomData.users : [];
		
		const mapUserToList = roomUsers.map((user)=> {
			return (
				<li className='list-group-item' key={user}>User: {user}</li>
			);
		});
		return mapUserToList;
	}
	
	renderNewList() {
		axios.get('/api/getRoom', {
			params: {
				id: this.props.match.params.id
			}
		}).then(({data})=> {
			this.setState({roomData: data});
		});
	}
	
	render() {
		const roomName = this.state.roomData.name;
		const roomID = this.state.roomData.id;
		const roomUsers = (this.state.roomData.users) ? this.state.roomData.users : [];
		
		const generateUserList = this.generateUserList();
		return(
			<div>
				<div id='rm-name'>
					{roomName}
					<span id='rm-id'>ID: {roomID}</span>
				</div>
				<hr/>
				<div className='row'>
					<div id='rm-chat' className='col-7'>
						<ChatBox/>
					</div>
					<div id='rm-users' className='col-3'>
						<ul className='list-group'>
							<li className='list-group-item'>There are {roomUsers.length} users</li>
							{generateUserList}
						</ul>
					</div>
					<div id='rm-entrance' className='col-2'>
						<JoinRoom renderNewList={this.renderNewList} roomID={roomID}/>
						<LeaveRoom renderNewList={this.renderNewList} roomID={roomID}/>
					</div>
				</div>
			</div>
		);
	}
}