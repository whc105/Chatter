import React from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('/');
export default class CurrentUsers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  online: ''
		};
		socket.on('getClientTotal', (clientAmount)=> {
			this.setState({
				online: clientAmount
			});
		});
	}
	
	updateOnline(clientAmount) {
		this.setState({
			online: clientAmount
		});
	}
	
	componentDidMount() {
		socket.emit('getClientTotal');
	}
	
	componentWillUnmount() {
	  socket.close();
	}
	
	render() {
		return(
			<div id='client-count'>
			  <span id='online'>
				Users Online: {this.state.online} <i className='fas fa-globe animated infinite flash online-icon'/>
			  </span>
			</div>
		)
	}
}