import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

import Home from './components/home/home.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Login from './components/login/login.jsx';
import Register from './components/register/register.jsx';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let routes = [
      { path: '/', name: 'Home', component: Home },
      { path: '/login', name: 'Login', component: Login },
      { path: '/register', name: 'Register', component: Register },
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