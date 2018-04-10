import React from 'react';
import axios from 'axios';
import './leave-room.css';

export default class LeaveRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roomID: ''
		};
		this.leaveRoom = this.leaveRoom.bind(this);
	}
	
	componentWillReceiveProps(props) {
		this.setState({
			roomID: props.roomID
		});
	}
	leaveRoom() {
		axios.post('/api/leaveRoom', {
			roomID: this.state.roomID
		}).then(({data})=> {
			if (data) {
				window.location = '/';
			}
		});
	}
	render() {
		return(
			<div id='leave'>
				<button onClick={this.leaveRoom} className='bttn-unite bttn-md bttn-default bttn-no-outline' id='leave-bttn'>Leave Room</button>
			</div>
		);
	}
}