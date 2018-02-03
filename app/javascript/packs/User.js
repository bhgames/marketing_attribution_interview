import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import { 
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


export default class User extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.getUser();
    this.getRepositories();
  }

  async getUser() {
    let response = await fetch(`/api/users/${this.props.match.params.userId}`);
    let body = await response.json();
    this.setState({user: body});
  }

  async getRepositories() {
    let response = await fetch(`/api/users/${this.props.match.params.userId}/repositories`);
    let body = await response.json();
    this.setState({repositories: body});
  }

  render() {
    return (
        <div>
          {!this.state.user && <p>Loading user data...</p>}
          {this.state.user &&
            <div>
              <h3>Name: {this.state.user.name}</h3>
              <h3>Email: {this.state.user.email}</h3>
            </div>
          }
          {!this.state.repositories && <p>Loading repository data...</p>}
          {this.state.repositories && 
            <div>
              <h3> Repositories: </h3>
              <ul>
                {this.state.repositories.map((r) => <li key={r.id}>{r.name} - {r.description}</li>)}
              </ul>
            </div>
          }
        </div>
      )
  }
}