import React from 'react';
import axios from 'axios';
import './leave-room.css';

export default class LeaveRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roomID: ''
		};
		this.handleClick = this.handleClick.bind(this);
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
			console.log(data);
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