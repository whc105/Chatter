import React from 'react';
import axios from 'axios';

import './room.css';

export default class Room extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			params: props.match.params.id
		};
	}
	
	componentWillMount() {
		axios.get('/api/getRoom', {
			params: {
				id: this.state.params
			}
		}).then(({data})=> {
			console.log(data);
		});
	}
	
	render() {
		console.log(this.state.params);
		return(
			<div>DATAA</div>
		);
	}
}