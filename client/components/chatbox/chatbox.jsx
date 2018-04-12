import React from 'react';
import axios from 'axios';
import { animateScroll } from 'react-scroll';
import socketIOClient from 'socket.io-client';
import './chatbox.css';

export default class ChatBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: 'https://whc309-final-project-wchen1.c9users.io/',
			msg: []
		};
		
		this.sendMsg = this.sendMsg.bind(this);
		
		const socket = socketIOClient(this.state.url);
		socket.on('send', (message)=> {
			this.updateMsg(message);
		});
	}
	
	//Auto scrolls to bottom
	scrollToBttom() {
		animateScroll.scrollToBottom({
			containerId: 'chat-msg'
		});
	}
	
	//Sends message once button is pressed
	sendMsg() {
		const socket = socketIOClient(this.state.url);
		const message = this.refs.msg.value;
		socket.emit('send', message);
	}
	
	//Updates the list
	updateMsg(message) {
		this.setState({
			msg: this.state.msg.concat(message)
		});
	}
	
	msgToListElem(msgList) {
		let count = 0;
		return msgList.map((msg)=> {
			count++;
			return <li className='list-group-item' key={count}>{msg}</li>;
		});
	}
	
	render() {
		const MappedElem = this.msgToListElem(this.state.msg);
		this.scrollToBttom();
		return(
			<div id='chatbox'>
				<div id='chat-msg'>
					<ul className='list-group chat-list'>
						{MappedElem}
					</ul>
				</div>
				<div className='input-group fixed-bottom' id='chat-field'>
					<input type='text' className='form-control' id='chat-input' ref='msg'/>
					<div className='input-group-append'>
						<button className='bttn-bordered bttn-md bttn-default bttn-no-outline' onClick={this.sendMsg}>Send</button>
					</div>
				</div>
			</div>
		);
	}
}

/*
<button onClick={this.red}>red</button>
<button onClick={this.green}>green</button>
*/