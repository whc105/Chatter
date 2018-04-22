import React from 'react';
import axios from 'axios';
import './create-room.css';

export default class CreateRoom extends React.Component {
	constructor(props) {
		super(props);
		this.createRoom = this.createRoom.bind(this);
		this.state = {
			username: undefined
		};
	}
	
	componentDidMount() {
		axios.get('/api/current-user')
		.then(({data})=> {
			if (data) {
				this.setState({username: data.username});
			}
		});
	}
	
	createRoom() {
		const refs = this.refs;
		axios.post('/chat/make-room', {
			name: refs.rmName.value,
			createdBy: this.state.username
		}).then((res)=> {
			if (true) {
				window.location = '../chat';
			}
		});
	}
	
	render() {
		return(
			<div id='rm-maker'>
				<button type='button' data-toggle='modal' data-target='#create-room' className='bttn-bordered bttn-md bttn-default bttn-no-outline'>Create A Room</button>
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
