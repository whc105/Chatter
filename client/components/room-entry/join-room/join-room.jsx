import React from 'react';
import axios from 'axios';
import './join-room.css';

export default class JoinRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roomID: ''
		};
		this.handleClick = this.handleClick.bind(this);
	}
	
	//Sets the state of the prop once the roomID arrives
	//Will be used to tell Axios what room to join
	componentWillReceiveProps(props) {
		this.setState({
			roomID: props.roomID
		});
	}
	
	joinRoom() {
		axios.post('/api/joinRoom', {
			roomID: this.state.roomID
		}).then(({data})=> {
			console.log(data);
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