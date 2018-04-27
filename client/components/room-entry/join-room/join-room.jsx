import React from 'react';
import axios from 'axios';
import './join-room.css';

export default class JoinRoom extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	//Sets the state of the prop once the roomID arrives
	//Will be used to tell Axios what room to join
	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			roomID: nextProps.roomID
		};
	}
	
	joinRoom(key) {
		axios.post('/api/joinRoom', {
			roomID: this.state.roomID,
			key: key
		});
	}
	
	handleClick() {
		const key = this.refs.key.value;
		this.joinRoom(key);
		this.props.renderNewList();
	}
	
	render() {
		return(
			<div id='join'>
				<button type='button' data-toggle='modal' data-target='#create-room' className='bttn-unite bttn-md bttn-default bttn-no-outline' id='join-bttn'>Join A Room</button>
				<div className='modal animated zoomIn' id='create-room' tabIndex='-1' role='dialog' aria-labelledby='create-room-label' aria-hidden='true'>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title' id='create-room-label'>Join A Room</h5>
							</div>
							<div className='modal-body'>
								<form className='form-group'>
									<div className='input-group'>
										<div className='input-group-prepend'>
											<label className='input-group-text' htmlFor='input-group-rm-key'>
												<i className='fas fa-warehouse'></i>
											</label>
										</div>
										<input id='input-group-rm-key' type='text' placeholder='Room Key' ref='key'/>
									</div>
								</form>
							</div>
							<div className='modal-footer'>
								<button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
								<button onClick={this.handleClick} type='button' className='btn btn-primary'>Join Room</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}