import React, {Component} from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <div className="message">
        <span className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
      <div className="message system">{this.props.message.notification}</div>
      </div>
    );
  }
}

export default Message;

