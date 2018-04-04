import React from 'react';
import axios from 'axios';

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

class CreateRoom extends React.Component {
	constructor(props) {
		super(props);
		this.createRoom = this.createRoom.bind(this);
	}
	
	createRoom() {
		const refs = this.refs;
		axios.post('/chat/make-room', {
			name: refs.rmName.value
		}).then((res)=> {
			if (true) {
				window.location = '../chat';
			}
		});
	}
	
	render() {
		return(
			<div id='rm-maker'>
				<button type='button' data-toggle='modal' data-target='#create-room' className='bttn-slant bttn-md bttn-primary bttn-no-outline'>Create A Room</button>
				<div className='modal animated zoomIn' id='create-room' tabIndex='-1' role='dialog' aria-labelledby='create-room-label' aria-hidden='true'>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title' id='create-room-label'>Create A Room</h5>
							</div>
							<div className='modal-body'>
								<form className='form-group'>
									<div className='input-group'>
										<div className='input-group-prepend'>
											<label className='input-group-text' htmlFor='input-group-rm-name'>
												<i className='fas fa-warehouse'></i>
											</label>
										</div>
										<input id='input-group-rm-name' type='text' placeholder='Room Name' ref='rmName'/>
									</div>
								</form>
							</div>
							<div className='modal-footer'>
								<button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
								<button onClick={this.createRoom} type='button' className='btn btn-primary'>Create Room</button>
							</div>
						</div>
					</div>
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