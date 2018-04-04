import React from 'react';
import axios from 'axios';
import './chat.css';

export default class Chat extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<div id='rm-maker'>
					<button type='button' data-toggle='modal' data-target='#create-room' className='bttn-slant bttn-md bttn-primary bttn-no-outline'>Create A Room</button>
					<div className='modal animated zoomIn' id='create-room' tabIndex='-1' role='dialog' aria-labelledby='create-room-label' aria-hidden='true'>
						<div className='modal-dialog' role='document'>
							<div className='modal-content'>
								<div className='modal-header'>
									<h5 className='modal-title' id='create-room-label'>Create A Room</h5>
								</div>
								<div className='modal-body'>
									Placeholder for creating room form
								</div>
								<div className='modal-footer'>
									<button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
									<button type='button' className='btn btn-primary'>Save changes</button>
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		);
	}
}