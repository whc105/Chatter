import React from 'react';
import axios from 'axios';
import './leave-room.css';

export default class LeaveRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleClick = this.handleClick.bind(this);
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			roomID: nextProps.roomID
		};
	}
	
	leaveRoom() {
		axios.post('/api/leaveRoom', {
			roomID: this.state.roomID
		});
	}
	
	handleClick() {
		this.leaveRoom();
		this.props.renderNewList();
	}
	
	render() {
		return(
			<div id='leave-room'>
				<button onClick={this.handleClick} className='bttn-unite bttn-md bttn-danger bttn-no-outline' id='leave-bttn'>Leave Room</button>
			</div>
		);
	}
}