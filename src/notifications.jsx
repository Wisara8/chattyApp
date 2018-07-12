import React, {Component} from 'react';

export default class Notifications extends Component {
  render(){
    const note = this.props;
    console.log(note.note);
    return (

      <div className="notification">
        <span className="notification-content">{note.note}</span>
      </div>

    )
  }
}