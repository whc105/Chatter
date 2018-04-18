import React from 'react';
import socketIOClient from 'socket.io-client';
import './home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://whc309-final-project-wchen1.c9users.io/',
      online: ''
    };
  }
  componentDidMount() {
		const socket = socketIOClient(this.state.url);
		socket.on('getClientTotal', (onlineCount)=> {
		  this.setState({
		    online: onlineCount
		  });
		});
	}
	componentWillUnmount() {
	  const socket = socketIOClient(this.state.url);
	  socket.removeListener('getClientTotal');
	}
  render() {
    return ( 
      <div className='content'>
        <div id='intro-content'>
          <span className='welcome-title'>Welcome to Chatter </span>
          <br/>
          <br/>
          <p className='lead'>
            Chatting with other people in your class
          </p>
          <p className='lead'>
            Connecting with other people in your class
          </p>
          <p className='lead'>
            Working with other people in your class
          </p>
        </div>
        <div id='client-count'>
          <span id='online'>
            Users Online: {this.state.online} <i className='fas fa-globe animated infinite flash online-icon'/>
          </span>
        </div>
      </div>
    );
  }
}