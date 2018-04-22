import React from 'react';
import RoomSearch from '../search/room-search/room-search.jsx';
import './key.css';

export default class Key extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRoom: undefined
		};
		this.selectedRoom = this.selectedRoom.bind(this);
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
	
	render() {
		const room = (this.state.selectedRoom) ? this.state.selectedRoom.name : '';
		
		return (
			<div>
				<div id='header'>
					<span id='header-title'>Generate Keys</span>
				</div>
				<div id='room-search'>
					<RoomSearch selectedRoom={this.selectedRoom} type='select'/>
					<span id='selected-room'>{room}</span>
				</div>
			</div>
		);
	}
}