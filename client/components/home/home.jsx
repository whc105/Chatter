import React from 'react';
import CurrentUsers from '../current-users/current-users.jsx';
import './home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return ( 
      <div className='content'>
        <CurrentUsers/>
        <div id='intro-content' className='animated fadeInDownBig'>
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
      </div>
    );
  }
}