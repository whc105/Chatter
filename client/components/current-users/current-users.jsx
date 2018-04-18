import React from 'react';
import socketIOClient from 'socket.io-client';

export default class CurrentUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          url: '/',
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
	    return(
	        <div id='client-count'>
              <span id='online'>
                Users Online: {this.state.online} <i className='fas fa-globe animated infinite flash online-icon'/>
              </span>
            </div>
	    )
	}
}