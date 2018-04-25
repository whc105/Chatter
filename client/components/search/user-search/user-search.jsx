import React from 'react';
import axios from 'axios';
import './user-search.css';

export default class UserSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ''
		};
		this.liveSearch = this.liveSearch.bind(this);
	}
	
	componentDidMount() {
		axios.get('/api/getAllUsers')
		.then(({data})=> {
			axios.get('/api/current-user')
			.then((user)=> {
				const resultList = data.filter((elem)=> {
					return elem.username !== user.data.username;
				});
				this.setState({
					users: resultList
				});
			});
		});
	}
	
	//Live search function
	liveSearch(e) {
		this.setState({
			query: e.target.value
		});
	}
	
	//Use redirect property if the type is search-link
	//Use select property if the type is select
	mapToDropdown() {
		const users = this.state.users;
		const query = this.state.query.toLowerCase();
		const filterUsers = users.filter((user)=> {
			return user.username.toLowerCase().indexOf(query) >= 0;
		});
		
		let count = 0;
		const mapToComponent = filterUsers.slice(0, 6).map((user)=> {
			return (
				<button onClick={()=>{
						this.props.selectedUser(user.username);
						this.setState({query: ''});
				}} className='list-group-item bttn-minimal bttn-md bttn-default bttn-no-outline select-button' key={count++}>
					<span className='room-name'>Name: {user.username}</span>
				</button>
			);
		});
		return mapToComponent;
	}
	
	render() {
		//If query isn't blank, the results will pop up
		const mapToDropdown = (this.state.query !== '') ? this.mapToDropdown() : undefined;
		return(
			<div id='search'>
				<ul className='list-group'>
					<input text='text' className='list-group-item bttn-bordered bttn-md bttn-default' placeholder='Search For User' onChange={this.liveSearch}/>
					{mapToDropdown}
				</ul>
			</div>
		);
	}
}