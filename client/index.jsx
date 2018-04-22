import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/home/home.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Login from './components/login/login.jsx';
import Register from './components/register/register.jsx';
import Chat from './components/chat/chat.jsx';
import Room from './components/room/room.jsx';
import DirectMessage from './components/direct/direct.jsx';
import Key from './components/key/key.jsx';

import './index.css';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let routes = [
      { path: '/', name: 'Home', component: Home },
      { path: '/login', name: 'Login', component: Login },
      { path: '/register', name: 'Register', component: Register },
      { path: '/chat', name:'Chat', component: Chat },
      { path: '/chat/:id', name:'Room', component: Room },
      { path: '/direct', name: 'DirectMessage', component: DirectMessage },
      { path: '/key', name: 'Key', component: Key },
    ];

    return (
      <Router>
        <div style={{padding: '7%'}}>
          <Navbar/>
          <Switch>
            {routes.map(route => <Route exact path={route.path} component={route.component} key={route.path} />)}
            <Redirect to ='/'/>
          </Switch>
        </div>
      </Router>
    );
  }
}

render(<Index />, document.getElementById('app'));