'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {entries: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/all'}).done(response => {
			this.setState({entries: response.entity._embedded.data});
		});
	}

	render() {
		return (
			// <EmployeeList employees={this.state.employees}/>
            console.log(this.state.entries);
            <h1> {this.state.entries} </h1>
		)
	}
}
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// class EmployeeList extends React.Component{
// 	render() {
// 		const employees = this.props.employees.map(employee =>
// 			<Employee key={employee._links.self.href} employee={employee}/>
// 		);
// 		return (
// 			<table>
// 				<tbody>
// 					<tr>
// 						<th>First Name</th>
// 						<th>Last Name</th>
// 						<th>Description</th>
// 					</tr>
// 					{employees}
// 				</tbody>
// 			</table>
// 		)
// 	}
// }
