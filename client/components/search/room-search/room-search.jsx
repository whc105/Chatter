import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './room-search.css';

export default class RoomSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			type: ''
		};
		this.liveSearch = this.liveSearch.bind(this);
	}
	
	//Takes a type
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.type !== prevState.type) {
			return {
				type: nextProps.type
			};
		}
		return null;
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
	
	//Use redirect property if the type is search-link
	//Use select property if the type is select
	mapToDropdown() {
		const rooms = this.state.rooms;
		const query = this.state.query.toLowerCase();
		const filterRooms = rooms.filter((room)=> {
			return room.name.toLowerCase().indexOf(query) >= 0;
		});
		
		const mapToComponent = filterRooms.slice(0, 6).map((room)=> {
			if (this.state.type === 'search-link') {
				return (
					<Link to={`/chat/${room.id}`} key={room.id}>
						<button className='list-group-item bttn-minimal bttn-md bttn-default bttn-no-outline link-button'>
							<span className='room-name'>Name: {room.name}</span>
							<span className='room-id'>ID: {room.id}</span>
						</button>
					</Link>
					);
			} else if (this.state.type === 'select') {
				return (
					<button onClick={()=>{
							this.props.selectedRoom(room.name, room.id);
							this.setState({query: ''});
					}} className='list-group-item bttn-minimal bttn-md bttn-default bttn-no-outline select-button' key={room.id}>
						<span className='room-name'>Name: {room.name}</span>
						<span className='room-id'>ID: {room.id}</span>
					</button>
				);
			}
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