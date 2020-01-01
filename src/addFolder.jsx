import React, { Component } from 'react';
import Axios from 'axios';

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitFolder = this.submitFolder.bind(this);
  }

  handleChange(event) {
    this.setState({ textValue: event.target.value })
  }

  submitFolder(event) {
    event.preventDefault();
    Axios.post('/folder', { path: '/', name: this.state.textValue })
      .then(folder => {
        console.log(folder);
      })
  }

  render () {
    return (
    <form onSubmit={this.submitFolder}>
      <input type="text" value={this.state.value} onChange={this.handleChange} required></input>
      <input type="submit" value="Add a folder"></input>
    </form>
    )
  }
}