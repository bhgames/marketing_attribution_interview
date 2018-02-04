import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import { 
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import GenericLineItem from "./GenericLineItem";

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


  close() {
    this.getUser();
    this.getRepositories();
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
          {!this.state.repositories && this.state.user && <p>Loading repository data...</p>}
          {this.state.repositories && this.state.user && 
            <div>
              <h3> Repositories: </h3>
              <ul>
                {this.state.repositories.map((r) => <GenericLineItem key={r.id} data={r} close={this.close.bind(this)} fields={["name", "description"]} type="repository" endpoint={`users/${this.state.user.id}/repositories`} />)}
                <GenericLineItem key={0} close={this.close.bind(this)} fields={["name", "description"]} type="repository" endpoint={`users/${this.state.user.id}/repositories`} />
              </ul>
            </div>
          }
        </div>
      )
  }
}