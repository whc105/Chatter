import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './room-search.css';

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ''
		};
		this.liveSearch = this.liveSearch.bind(this);
	}
	
	//Gets all the rooms and mounts it
	componentDidMount() {
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
	
	
	mapToDropdown() {
		const rooms = this.state.rooms;
		const query = this.state.query.toLowerCase();
		const filterRooms = rooms.filter((room)=> {
			return room.name.toLowerCase().indexOf(query) >= 0;
		});
		const mapToComponent = filterRooms.slice(0, 6).map((room)=> {
			return (
				<Link to={`/chat/${room.id}`} key={room.id}>
					<button className='list-group-item bttn-minimal bttn-md bttn-default link-button'>
						<span className='room-name'>Name: {room.name}</span>
						<span className='room-id'>ID: {room.id}</span>
					</button>
				</Link>
				);
		});
		return mapToComponent;
	}
	
	render() {
		//If query isn't blank, the results will pop up
		const mapToDropdown = (this.state.query !== '') ? this.mapToDropdown() : undefined;
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