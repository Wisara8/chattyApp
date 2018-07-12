import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './components/navbar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({currentUser: {name: 'Anonymous'},
                   messages: []
                  //  notifications: []
                  });
                  this.onPost = this.onPost.bind(this);
                  this.onUser = this.onUser.bind(this);
                  this.handleBroadCast = this.handleBroadCast.bind(this);
                  this.webSock = new WebSocket('ws://0.0.0.0:3001');
  }
  onPost (username, message) {
    const newId = this.state.messages.length + 1;
    const newMessage = {id: newId, username: username, content: message, type: "onPost"};
    //const messages = this.state.messages.concat(newMessage);
    // this.setState({messages: messages})
    this.webSock.send(JSON.stringify(newMessage));
    this.webSock.addEventListener("message",this.handleBroadCast);
  }
  onUser (username, oldUser) {
    const changeUser = {newUser: username, oldUser: oldUser, type: "postUser"};
    this.webSock.send(JSON.stringify(changeUser));
  }

  handleBroadCast(evt) {
    //console.log('in client now:');
    // console.log(JSON.parse(evt.data));
    const msg = JSON.parse(evt.data);
    if (msg.type === "postUser"){
      const newNotifications = {note: msg.note, type: msg.type};
      const newNote = this.state.messages.concat(newNotifications);
      this.setState({messages: newNote, currentUser: {name: msg.username}});
    } else {
    const newMsg = {id: msg.id, username: msg.username, content: msg.content, type: msg.type};
    const messages = this.state.messages.concat(newMsg);
    this.setState({messages: messages, currentUser: {name: msg.username}});
    }
  }

  componentDidMount() {

    console.log("componentDidMount <App />");

    this.webSock.onopen = function (event) {
      // console.log("working?");
      // webSock.send('hello'); 
    };
  
    // webSock.send("Connected to Server")

    // //test incoming message
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList /*notifications={this.state.notifications}*/ content={this.state.messages} />
        <ChatBar onUser={this.onUser} onPost={this.onPost} currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;
