import React from 'react';
import './search.css';

export default class Search extends React.Component {
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
	
	renderList() {
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
			return <li className='list-group-item' key={key}>{room.name}</li>;
		});
		return mapToComponent;
	}
	
	render() {
		const renderList = this.renderList();
		return(
			<div>
				<ul className='list-group'>
					<input text='text' className='list-group-item' placeholder='Search For Room' onChange={this.liveSearch}/>
					{renderList}
				</ul>
			</div>
		);
	}
}