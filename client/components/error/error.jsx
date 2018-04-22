import React from 'react';

export default class ErrorMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: ''
		};
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errorMessage !== prevState.errorMessage) {
			return {
				errorMessage: nextProps.errorMessage
			};
		}
		return null;
	}
	
	render() {
		return(
			<div id='login-error'>
				<span>
				{this.state.errorMessage}
				</span>
				<br/>
			</div>
		);
	}
}