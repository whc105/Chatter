import React from 'react';
import CreateRoom from '../create-room/create-room.jsx';
import RoomSearch from '../search/room-search/room-search.jsx';
import './chat.css';

export default class Chat extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<CreateRoom/>
				<RoomSearch/>
			</div>
		);
	}
}