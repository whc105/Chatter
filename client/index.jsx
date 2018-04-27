import React from 'react';
import axios from 'axios';
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
    this.state = {
      permission: -1
    };
  }
  
  componentDidMount() {
    axios.get('/api/current-user')
    .then(({data})=> {
      this.setState({
        permission: data.permission
      });
    });
  }
  
  render() {
    let routes = [
      { path: '/', name: 'Home', component: Home },
      { path: '/login', name: 'Login', component: Login },
      { path: '/register', name: 'Register', component: Register },
      { path: (this.state.permission >= 0) ? '/chat' : '/', name:'Chat', component: Chat },
      { path:  (this.state.permission >= 0) ? '/chat/:id' : '/', name:'Room', component: Room },
      { path:  (this.state.permission >= 0) ? '/direct' : '/', name: 'DirectMessage', component: DirectMessage },
      { path:  (this.state.permission === 1) ? '/key' : '/', name: 'Key', component: Key },
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