import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import './chatbox.css';

export default class ChatBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: 'https://whc309-final-project-wchen1.c9users.io/'
		}
		
		
		this.red = this.red.bind(this);
		this.green = this.green.bind(this);
		
		this.sendMsg = this.sendMsg.bind(this);
	}
	
	red() {
		const socket = socketIOClient(this.state.url);
		socket.emit('change color', 'red');
	}
	
	green() {
		const socket = socketIOClient(this.state.url);
		socket.emit('change color', 'green');
	}
	
	sendMsg() {
		const socket = socketIOClient(this.state.url);
		const message = this.refs.msg.value;
		socket.emit('send', message);
	}
	
	render() {
		const socket = socketIOClient(this.state.url);
		socket.on('change color', (color)=> {
			document.body.style.backgroundColor = color;
		});
		
		socket.on('send', (message)=> {
			console.log(message);
		});
		
		//<button onClick={this.send}>red</button>
		//<button onClick={this.send1}>green</button>
		return(
			<div id='chatbox'>
				<div className='input-group' id='chat-field'>
					<input type='text' className='form-control' id='chat-input' ref='msg'/>
					<div className='input-group-append'>
						<button className='bttn-bordered bttn-md bttn-default bttn-no-outline' onClick={this.sendMsg}>Send</button>
					</div>
				</div>
				<button onClick={this.red}>red</button>
				<button onClick={this.green}>green</button>
			</div>
		);
	}
}