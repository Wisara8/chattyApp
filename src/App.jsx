import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './components/navbar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({currentUser: {name: 'Anonymous'},
                   messages: [
                    {
                      id: 1,
                      username: "Bob",
                      content: "Has anyone seen my marbles?",
                    },
                    {
                      id: 2,
                      username: "Anonymous",
                      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                    }
                  ],
                  }
                  );
                  this.onPost = this.onPost.bind(this);
  }
  onPost (username, message) {
    const newId = this.state.messages.length + 1;
    const newMessage = {id: newId, username: username, content: message};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages})
  }

  componentDidMount() {

    console.log("componentDidMount <App />");

    const webSock = new WebSocket('ws://0.0.0.0:3001');

    webSock.onopen = function (event) {
      console.log("working?");
      webSock.send('hello'); 
    };

    // webSock.send("Connected to Server")

    //test incoming message
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);

  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList content={this.state.messages} />
        <ChatBar onPost={this.onPost} currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;
