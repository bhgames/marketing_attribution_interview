import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { 
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import EditGenericType from "./EditGenericType";

export default class GenericLineItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  close() {
    this.setState({editing: false}, () => this.props.close())
  }

  async delete(e) {
    e.preventDefault();
    await fetch(`/api/${this.props.endpoint}/${this.props.data.id}`, {
                  method: "DELETE", 
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }});
    this.close();
  }

  render() {
    let { fields, endpoint, type, data } = this.props;

    if(!this.state.editing) {
      if(data) {
        return <li>
          <Link to={`/users/${data.id}`}>
            {fields.map((f) => <span key={f}>{data[f]} {fields.indexOf(f) == fields.length - 1 ? "" : " - "}</span>)}
          </Link> 
          &nbsp;|&nbsp;
          <a href="#" onClick={(e) => { e.preventDefault; this.setState({editing: true})}}>[Edit]</a>
          {data.id && 
            <span>&nbsp;|&nbsp;<a href="#" onClick={this.delete.bind(this)}>[Delete]</a></span>}
        </li>
      } else {
        return (
          <li><a href="#" onClick={(e) => { e.preventDefault; this.setState({editing: true})}}>[Add New]</a></li>
        )
      }

    } else {
      return (
        <li><EditGenericType close={this.close.bind(this)} data={data} fields={fields} type={type} endpoint={endpoint} /></li>
      )
    }
  }
}