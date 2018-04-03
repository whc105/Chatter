import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<nav className='navbar navbar-expand-md navbar-dark bg-dark fixed-top'>
					<Link to='/' className='navbar-brand bttn-minimal bttn-xl bttn-default' id='brand'>Chatter</Link>
					<button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarNavDropdown'>
						<ul className='navbar-nav ml-auto'>
							<li className='nav-item'>
								<Link to='/login' className='nav-link bttn-bordered bttn-sm bttn-default' id='login'>Login</Link>
							</li>
							<li className='nav-item'>
								<Link to='/register' className='nav-link bttn-bordered bttn-sm bttn-default' id='register'>Register</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}