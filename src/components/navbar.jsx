import React, {Component} from 'react';

export default class Navbar extends Component {
  render(){
    const counter = this.props.counter;
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="navbar-count">{counter} Users Online</p>
      </nav>
    )
  }
}

