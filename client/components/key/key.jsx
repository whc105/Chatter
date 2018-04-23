import React from 'react';
import axios from 'axios';
import RoomSearch from '../search/room-search/room-search.jsx';
import './key.css';

export default class Key extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRoom: undefined
		};
		this.selectedRoom = this.selectedRoom.bind(this);
		this.createKey = this.createKey.bind(this);
	}
	
	//Selected Room in dropdown gets sent here
	selectedRoom(roomName, roomID) {
		const room = {
			name: roomName,
			id: roomID
		};
		this.setState({
			selectedRoom: room
		});
	}
	
	createKey() {
		if (this.state.selectedRoom && this.refs.key.value) {
			axios.post('/api/createRoomKeys', {
				roomID: this.state.selectedRoom.id,
				keyVal: this.refs.key.value
			}).then(({data})=> {
				console.log(data);
			});
		}
		
	}
	
	render() {
		const room = (this.state.selectedRoom) ? this.state.selectedRoom.name : 'Please Select A Room';
		
		return (
			<div>
				<div id='header'>
					<span id='header-title'>Generate Keys</span>
				</div>
				<hr/>
				<div id='selected-room'>
					Room: <span>{room}</span>
					<div className='input-group mb-3' id='key-number-amount'>
						<input className='input is-rounded' id='key-amount' type='number' placeholder='Number of Keys to Generate' ref='key'/>
					</div>
					<button onClick={this.createKey} className='bttn-bordered bttn-md bttn-default bttn-no-outline'>Create Keys</button>
				</div>
				<div id='room-search'>
					<RoomSearch selectedRoom={this.selectedRoom} type='select'/>
				</div>
			</div>
		);
	}
}