import React from 'react';
import axios from 'axios';
import './login.css';
import ErrorMessage from '../error/error.jsx';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      errorMessage: ''
    };
  }
  
  componentDidMount() {
    axios.get('/api/current-user')
    .then(({data})=> {
      if (data) {
        window.location = '/';
      }
    });
  }
  
  login() {
    const refs = this.refs;
    axios.post('/auth/login', {
      username: refs.username.value, password: refs.password.value
    }).then((res)=> {
      if (res.data !== true) {
        this.setState({
          errorMessage: res.data
        });
      } else {
        window.location = '/';
      }
    });
  }
  
  render() {
    return (
      <div className='row'>
        <div className='col-md-10 offset-md-1'>
          <h2 className='h2'>Login</h2>
          <form id='login-form'>
            <ErrorMessage errorMessage={this.state.errorMessage}/>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-user'>
                    <i className='fas fa-user'></i>
                  </label>
                </div>
                <input id='input-group-user' type='text' placeholder='Username' name='username' ref='username'/>
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-password'>
                    <i className='fas fa-lock'></i>
                  </label>
                </div>
                <input id='input-group-password' type='password' placeholder='Password' name='password' ref='password'/>
              </div>
            </div>
            <button type='button' onClick={this.login} className='btn btn-primary'>Login</button>
          </form>
        </div>
      </div>
    );
  }
}