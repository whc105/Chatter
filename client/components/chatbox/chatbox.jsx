import React from 'react';
import axios from 'axios';
import { animateScroll } from 'react-scroll';
import socketIOClient from 'socket.io-client';
import './chatbox.css';

const socket = socketIOClient('/');

export default class ChatBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			msg: []
		};
		
		this.sendMsg = this.sendMsg.bind(this);
		
		socket.on('send', (message)=> {
			this.updateMsg(message);
		});
	}
	
	//Gets the props and saves it into the roomID
	componentWillReceiveProps(props) {
		if (props.roomID !== undefined) {
			axios.get(`/api/getAllMessages/${props.roomID}`)
			.then(({data})=> {
				this.setState({
					msg: data.messages,
					roomID: props.roomID
				});
			});
		}
	}
	
	//Auto scrolls to bottom
	scrollToBttom() {
		animateScroll.scrollToBottom({
			containerId: 'chat-msg'
		});
	}
	
	//Sends message once button is pressed
	sendMsg() {
		const message = this.refs.msg.value;
		axios.get('/api/current-user')
		.then(({data})=> {
			socket.emit('send', {username: data.username, message: message, roomID: this.state.roomID});
		});
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
			return <li className='list-group-item' key={count}>{msg.message}</li>;
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