
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import { 
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class EditGenericType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || {}
    }
  }

  change(field, event) {
    let data = this.state.data;
    data[field] = event.target.value;
    this.setState({data: data});
  }

  async submit() {
    let obj = {};
    obj[this.props.type] = this.state.data;
    await fetch(`/api/${this.props.typePlural}/${this.state.data.id || ""}`, {
                  method: this.state.data.id ? "PUT" : "POST", 
                  body: JSON.stringify(obj),
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }});
    this.props.close();
  }

  render() {
    return (
      <div>
        <p>
          {this.props.fields.map((k) => 
            <span key={k}>{k.charAt(0).toUpperCase() + k.slice(1)}: <input name={k} id={k} value={this.state.data[k]} onChange={this.change.bind(this, k)}/></span>
          )}
          <span><input type="button" value="Submit" onClick={this.submit.bind(this)}/></span>
        </p>
      </div>
    )
  }
}