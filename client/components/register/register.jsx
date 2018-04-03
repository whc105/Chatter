import React from 'react';
import './register.css';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='row'>
        <div className='col-md-10 offset-md-1'>
          <h2 className='h2'>Register</h2>
          <br/>
          <form id='register-form'>
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
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-password-confirmation'>
                    <i className='fas fa-unlock'></i>
                  </label>
                </div>
                <input id='input-group-password-confirmation' type='text' placeholder='Password Confirmation'/>
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-email'>
                    <i className='fas fa-envelope'></i>
                  </label>
                </div>
                <input id='input-group-email' type='text' placeholder='Email'/>
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-key'>
                    <i className='fas fa-key'></i>
                  </label>
                </div>
                <input id='input-group-key' type='text' placeholder='Access Key'/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}