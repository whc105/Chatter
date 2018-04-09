import React from 'react';
import './join-room.css';

export default class JoinRoom extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div id='join'>
				<button className='bttn-unite bttn-md bttn-default bttn-no-outline' id='join-bttn'>Join Room</button>
			</div>
		);
	}
	
}