import React, {Component} from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Enter a name (Optional)" defaultValue={this.props.currentName} onBlur={this.props.onNameFieldBlur}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.updateMessageOnEnter}/>
      </footer>
    );
  }
}

export default ChatBar;