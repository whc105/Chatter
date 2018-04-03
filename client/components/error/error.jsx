import React from 'react';

export default class ErrorMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: ''
		};
	}
	
	componentWillReceiveProps(props) {
		this.setState({
			errorMessage: props.errorMessage
		});
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