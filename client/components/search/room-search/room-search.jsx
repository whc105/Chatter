import React from 'react';
import axios from 'axios';
import './room-search.css';

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
			query: ''
		};
		this.liveSearch = this.liveSearch.bind(this);
		this.dropdownRedirect = this.dropdownRedirect.bind(this);
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
	
	//Live search function
	liveSearch(e) {
		this.setState({
			query: e.target.value
		});
	}
	
	//Redirect to the chatrooms
	dropdownRedirect(roomID) {
		window.location = `../chat/${roomID}`;
	}
	
	mapToDropdown() {
		const rooms = this.state.rooms;
		const query = this.state.query.toLowerCase();
		if (query === '') {
			return;
		}
		const filterRooms = rooms.filter((room)=> {
			return room.name.toLowerCase().indexOf(query) >= 0;
		});
		const mapToComponent = filterRooms.slice(0, 6).map((room)=> {
			return (
				<li onClick={()=> this.dropdownRedirect(room.id)} className='list-group-item bttn-minimal bttn-md bttn-default' key={room.id}>Name: {room.name}
				<span className='room-id'>ID: {room.id}</span>
				</li>);
		});
		return mapToComponent;
	}
	
	render() {
		const mapToDropdown = this.mapToDropdown();
		return(
			<div id='search'>
				<ul className='list-group'>
					<input text='text' className='list-group-item bttn-bordered bttn-md bttn-default' placeholder='Search For Room' onChange={this.liveSearch}/>
					{mapToDropdown}
				</ul>
			</div>
		);
	}
}