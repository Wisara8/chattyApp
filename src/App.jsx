import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './components/navbar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({currentUser: 'Anonymous',
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
                  ]}
                  );
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList content={this.state.messages} />
        <ChatBar user={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
