
import React, {Component} from 'react';
import Message from './Message.jsx';
import Notifications from './notifications.jsx';

export default class MessageList extends Component {
  render(){

    const newMessages = this.props.content.map((message)=>{
      if (message.type === "onPost"){
      return(
        <Message
          username = { message.username } 
          content = { message.content }
        />)
      } else {
        return(
          <Notifications
            note = { message.note } 
          />)
      }
    }
    );
    
    return (
      <main className="messages">
        { newMessages }
      </main>
    )
  }
}