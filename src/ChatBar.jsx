import React, {Component} from 'react';

export default class ChatBar extends Component {
  render(){
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={this.props.user} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}