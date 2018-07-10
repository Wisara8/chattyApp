import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './components/navbar.jsx';
import Message from './Message.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Message />
        <ChatBar />
      </div>
    );
  }
}
export default App;
