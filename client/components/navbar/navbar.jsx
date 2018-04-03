import React from 'react';
import axios from 'axios';
import './navbar.css';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: ''
		};
	}
	componentWillMount() {
		axios.get('/api/current-user')
		.then(({data})=> {
			if (data) {
				this.setState({user: data});
			}
		});
	}
	render() {
		return (
			<div>
				<nav className='navbar navbar-expand-md navbar-dark bg-dark fixed-top'>
					<Link to='/' className='navbar-brand bttn-stretch bttn-xl bttn-default animated fadeIn' id='brand'>Chatter</Link>
					<button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarNavDropdown'>
						<ChatButtons/>
						<AuthButtons userData={this.state.user}/>
					</div>
				</nav>
			</div>
		);
	}
}

function AuthButtons(props) {
	if (props.userData) {
		return (
			<div></div>
		);
	} else {
		return (
			<ul className='navbar-nav ml-auto'>
				<li className='nav-item'>
					<Link to='/login' className='nav-link bttn-bordered bttn-sm bttn-default animated fadeIn' id='login'>Login</Link>
				</li>
				<li className='nav-item'>
					<Link to='/register' className='nav-link bttn-bordered bttn-sm bttn-default animated fadeIn' id='register'>Register</Link>
				</li>
			</ul>
		);
	}
}

function ChatButtons(props) {
	return (
		<ul className='navbar-nav ml-auto'>
			<li className='nav-item'>
				<Link to='/chat' className='nav-link bttn-bordered bttn-sm bttn-default animated fadeIn' id='chat'>Chat</Link>
			</li>
			<li className='nav-item'>
				<Link to='/direct' className='nav-link bttn-bordered bttn-sm bttn-default animated fadeIn' id='direct'>Direct Message</Link>
			</li>
		</ul>
	);
}