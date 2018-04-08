import React from 'react';
import axios from 'axios';
import CreateRoom from '../create-room/create-room.jsx';
import './chat.css';

export default class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: []
		};
	}
	
	//Gets all the rooms and mounts it
	componentWillMount() {
		axios.get('/api/getAllRooms')
		.then(({data})=> {
			this.setState({
				rooms: data
			});
		});
	}
	
	render() {
		return (
			<div>
				<CreateRoom/>
				<div id='search'>
					<Search content={this.state.rooms}/>
				</div>
			</div>
		);
	}
}

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			query: ''
		};
		this.liveSearch = this.liveSearch.bind(this);
	}
	
	//Sets the state of the component once props arrive from where
	componentWillReceiveProps(props) {
		this.setState({
			rooms: props.content
		});
	}
	
	//Live search function
	liveSearch(e) {
		this.setState({
			query: e.target.value
		});
	}
	
	mapToDropdown() {
		let key = 0;
		const rooms = this.state.rooms;
		const query = this.state.query.toLowerCase();
		if (query === '') {
			return;
		}
		const filterRooms = rooms.filter((room)=> {
			return room.name.toLowerCase().indexOf(query) >= 0;
		});
		const mapToComponent = filterRooms.slice(0, 6).map((room)=> {
			key++;
			return <li className='list-group-item' key={key}>{room.name}<span className='room-id'>{room.id}</span></li>;
		});
		return mapToComponent;
	}
	
	render() {
		const mapToDropdown = this.mapToDropdown();
		return(
			<div>
				<ul className='list-group'>
					<input text='text' className='list-group-item' placeholder='Search For Room' onChange={this.liveSearch}/>
					{mapToDropdown}
				</ul>
			</div>
		);
	}
}