

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import { 
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import GenericLineItem from "./GenericLineItem";

export default class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.getUsers();
  }

  async getUsers() {
    let response = await fetch("/api/users");
    let body = await response.json();
    this.setState({users: body});
  }

  close() {
    this.getUsers();
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        {!this.state.users && <p>Loading...</p>}
        {
          this.state.users && 
          <ul>
            {this.state.users.map((u) => <GenericLineItem key={u.id} data={u} close={this.close.bind(this)} fields={["name", "email"]} type="user" endpoint="users" />)}
            <GenericLineItem key={0} close={this.close.bind(this)} fields={["name", "email"]} type="user" endpoint="users" />
          </ul>
        }
      </div>
    )
  }
}

