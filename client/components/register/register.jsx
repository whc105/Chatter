import React from 'react';
import axios from 'axios';
import './register.css';
import ErrorMessage from '../error/error.jsx';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
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
  
  register() {
    const refs = this.refs;
    if (refs.password1.value !== refs.password2.value) {
      this.setState({
          errorMessage: 'Passwords do not match'
        });
    } else {
      axios.post('/register', {
        username: refs.username.value, password: refs.password1.value,
        email: refs.email.value, key: refs.key.value
      }).then((res)=> {
        if (res.data) {
          window.location = '/';
        } else {
          this.setState({
            errorMessage: 'Either username or email already exists'
          });
        }
      });
    }
  }
  
  render() {
    return (
      <div className='row'>
        <div className='col-md-10 offset-md-1'>
          <h2 className='h2'>Register</h2>
          <form id='register-form'>
            <ErrorMessage errorMessage={this.state.errorMessage}/>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-user'>
                    <i className='fas fa-user'></i>
                  </label>
                </div>
                <input id='input-group-user' type='text' placeholder='Username' ref='username'/>
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-password'>
                    <i className='fas fa-lock'></i>
                  </label>
                </div>
                <input id='input-group-password' type='text' placeholder='Password' ref='password1'/>
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-password-confirmation'>
                    <i className='fas fa-unlock'></i>
                  </label>
                </div>
                <input id='input-group-password-confirmation' type='text' placeholder='Password Confirmation' ref='password2'/>
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-email'>
                    <i className='fas fa-envelope'></i>
                  </label>
                </div>
                <input id='input-group-email' type='text' placeholder='Email' ref='email'/>
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <label className='input-group-text' htmlFor='input-group-key'>
                    <i className='fas fa-key'></i>
                  </label>
                </div>
                <input id='input-group-key' type='text' placeholder='Access Key' ref='key'/>
              </div>
            </div>
            <button type='button' onClick={this.register} className='btn btn-primary' id='submit'>Register</button>
          </form>
        </div>
      </div>
    );
  }
}