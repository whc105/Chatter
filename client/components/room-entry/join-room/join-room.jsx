import React from 'react';
import axios from 'axios';
import './join-room.css';

export default class JoinRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleClick = this.handleClick.bind(this);
	}
	
	//Sets the state of the prop once the roomID arrives
	//Will be used to tell Axios what room to join
	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			roomID: nextProps.roomID
		};
	}
	
	joinRoom() {
		axios.post('/api/joinRoom', {
			roomID: this.state.roomID
		});
	}
	
	handleClick() {
		this.joinRoom();
		this.props.renderNewList();
	}
	
	render() {
		return(
			<div id='join'>
				<button onClick={this.handleClick} className='bttn-unite bttn-md bttn-default bttn-no-outline' id='join-bttn'>Join Room</button>
			</div>
		);
	}
}