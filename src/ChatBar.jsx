import React, {Component} from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Enter a name (Optional)" defaultValue={this.props.currentName} onKeyPress={this.props.keyPress}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.keyPress}/>
      </footer>
    );
  }
}

export default ChatBar;