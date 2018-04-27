import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateRoom from '../create-room/create-room.jsx';
import DeleteRoom from '../delete-room/delete-room.jsx';
import RoomSearch from '../search/room-search/room-search.jsx';
import './chat.css';

export default class Chat extends React.Component {
	constructor(props) {
		super(props);
	  this.state = {
      permission: -1
    };
  }
  
  componentDidMount() {
    axios.get('/api/current-user')
    .then(({data})=> {
      this.setState({
        permission: data.permission
      });
    });
  }
	
	render() {
		const permission = this.state.permission;
		const makeRoom = (permission === 1) ? <CreateRoom/> : <div></div>;
		const deleteRoom = (permission === 1) ? <DeleteRoom/> : <div></div>;
		const linkKey = (permission === 1) ? (
			<Link to='/key'>
				<button className='bttn-bordered bttn-md bttn-default'>
					Key&nbsp;
					<i className="fab fa-keycdn"></i>
				</button>
			</Link>) : <div></div>;
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
					{makeRoom}
				</div>
				<br/>
				<div id='room-deletion'>
					{deleteRoom}
					<br/>
					{linkKey}
				</div>
			</div>
		);
	}
}