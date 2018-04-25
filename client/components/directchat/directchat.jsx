import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import './directchat.css';

const socket = socketIOClient('/');

export default class DirectChat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			msg: [],
			selectedUser: ''
		};
		
		this.sendMsg = this.sendMsg.bind(this);
		this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
		
		socket.on('direct-send', (message)=> {
			axios.get('/api/current-user')
			.then(({data})=> {
				const username = (data === '') ? 'Anonymous' : data.username;
				if ((message.username === username || message.username === this.state.selectedUser) 
				&& (message.selectedUser === this.state.selectedUser || message.selectedUser === username)) {
					this.updateMsg(message);
				}
			});
		});
	}

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
	
	componentWillReceiveProps(props) {
		if (props.selectedUser !== '') {
			axios.post('/api/createDirectMessage', {
				selectedUser: props.selectedUser
			}).then(({data})=> {
				this.setState({
					msg: data.messages,
					selectedUser: props.selectedUser
				});
			});
		}
	}
	
	//Auto scrolls to bottom
	scrollToBottom() {
		this.elem.scrollIntoView(false);
	}
	
	//Sends message once button is pressed
	sendMsg() {
		const message = this.refs.msg.value;
		this.refs.msg.value = '';
		axios.get('/api/current-user')
		.then(({data})=> {
			const username = (data === '') ? 'Anonymous' : data.username; //Remove once finished
			socket.emit('direct-send', {username: username, message: message, selectedUser: this.state.selectedUser});
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
			return <li className='list-group-item direct-msg-item' key={count++}>
				<span className='direct-username'>{msg.username}: </span>
				<span className='direct-msg'>{msg.message}</span>
			</li>;
		});
	}
	
	handleEnterKeyPress(e) {
		if (e.key === 'Enter') {
			this.sendMsg();
		}
	}
	
	render() {
		const MappedElem = this.msgToListElem(this.state.msg);
		return(
			<div id='directbox'>
				<div id='direct-msg-list'>
					<ul className='list-group direct-list'>
						{MappedElem}
						<li ref={elem => { this.elem = elem; }}></li>
					</ul>
				</div>
				<div className='input-group fixed-bottom' id='direct-field'>
					<input type='text' className='form-control' onKeyPress={this.handleEnterKeyPress} id='direct-input' ref='msg'/>
					<div className='input-group-append'>
						<button className='bttn-bordered bttn-md bttn-default bttn-no-outline' onClick={this.sendMsg}>Send</button>
					</div>
				</div>
			</div>
		);
	}
}