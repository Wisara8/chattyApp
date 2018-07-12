import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      user: this.props.currentUser,
      content: ''
    }
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onUsernameEnter = this.onUsernameEnter.bind(this);
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

    onUsernameEnter(event) {
      if (event.key === 'Enter') {
        console.log("hit Enter");
        const oldUser = this.props.currentUser;
        const currentUser = this.state.user;
        this.props.onUser(currentUser, oldUser);
        this.setState({user: event.target.value});
      }
    }
    onUsernameChange(event) {
      this.setState({user: event.target.value});
    }
  
  
  render(){
    // const {currentUser} = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={this.state.user} onChange={this.onUsernameChange} onKeyPress={this.onUsernameEnter}  />
        <input className="chatbar-message"  onKeyPress={ this.onKeyPress } placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}