import React from 'react';
import { Link } from 'react-router-dom';
import CreateRoom from '../create-room/create-room.jsx';
import DeleteRoom from '../delete-room/delete-room.jsx';
import RoomSearch from '../search/room-search/room-search.jsx';
import './chat.css';

export default class Chat extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<div id='header'>
					<span id='header-title'>Chat</span>
				</div>
				<hr/>
				<div id='room-dropdown'>
					<RoomSearch type='search-link'/>
				</div>
				<div id='room-creation'>
					<CreateRoom/>
				</div>
				<br/>
				<div id='room-deletion'>
					<DeleteRoom/>
				</div>
				<Link to='/key'>
					<button className='bttn-bordered bttn-sm bttn-default'>Key</button>
				</Link>
			</div>
		);
	}
}