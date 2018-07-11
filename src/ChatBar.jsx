import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      user: this.props.currentUser,
      content: ''
    }
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

    onKeyPress(event) {
      if (event.key === 'Enter') {
        const currentUser = this.state.user;
        const message = event.target.value;
        this.props.onPost(currentUser, message);
        event.target.value = '';
      }
    }

    onUsernameChange(event) {
      this.setState({user: event.target.value});
    }
  
  
  render(){
    // const {currentUser} = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onChange={this.onUsernameChange} value={this.state.user} />
        <input className="chatbar-message"  onKeyPress={ this.onKeyPress } placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}