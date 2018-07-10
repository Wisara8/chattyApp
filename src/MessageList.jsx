
import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render(){
    const newMessages = this.props.content.map((message)=>{
      return(
        <Message
          username = { message.username } 
          content = { message.content }
        />
    )
    });

    return (
      <main className="messages">
        { newMessages }
      </main>
    )
  }
}