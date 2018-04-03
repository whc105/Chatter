import React from 'react';
import './login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='row'>
        <div className='col-md-10 offset-md-1'>
          <h2 className='h2'>Login</h2>
          <br/>
          <form id='login-form'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-user'>
                    <i className='fas fa-user'></i>
                  </label>
                </div>
                <input id='input-group-user' type='text' placeholder='Username'/>
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-password'>
                    <i className='fas fa-lock'></i>
                  </label>
                </div>
                <input id='input-group-password' type='text' placeholder='Password'/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}