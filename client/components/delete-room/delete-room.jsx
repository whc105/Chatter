import React from 'react';
import axios from 'axios';
import RoomSearch from '../search/room-search/room-search.jsx';
import './delete-room.css';

export default class DeleteRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRoom: undefined
		};
		this.deleteRoom = this.deleteRoom.bind(this);
		this.selectedRoom = this.selectedRoom.bind(this);
	}
	
	//Selected Room in dropdown gets sent here
	selectedRoom(roomName, roomID) {
		const room = {
			name: roomName,
			id: roomID
		};
		this.setState({
			selectedRoom: room
		});
	}
	
	componentDidMount() {
		axios.get('/api/current-user')
		.then(({data})=> {
			if (data) {
				this.setState({username: data.username});
			}
		});
	}
	
	deleteRoom() {
		axios.post('/api/delete-room', {
			roomID: this.state.selectedRoom.id
		}).then((res)=> {
			if (true) {
				window.location = '../chat';
			}
		});
	}
	
	render() {
		return(
			<div id='rm-deleter'>
				<button type='button' data-toggle='modal' data-target='#delete-room' className='bttn-bordered bttn-md bttn-default bttn-no-outline'>
					Delete A Room&nbsp;
					<i className="far fa-minus-square"></i>
				</button>
				<div className='modal animated zoomIn' id='delete-room' tabIndex='-1' role='dialog' aria-labelledby='delete-room-label' aria-hidden='true'>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title' id='delete-room-label'>Delete A Room</h5>
							</div>
							<div className='modal-body'>
								<form className='form-group'>
									<div className='input-group'>
										<div className='input-group-prepend'>
											<label className='input-group-text' htmlFor='input-group-rm-name'>
												<i className='fas fa-warehouse'></i>
											</label>
										</div>
										<RoomSearch selectedRoom={this.selectedRoom} type='select'/>
									</div>
								</form>
							</div>
							<div className='modal-footer'>
								<button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
								<button onClick={this.deleteRoom} type='button' className='btn btn-primary'>Delete Room</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
}