import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: []
    }
  }
    updateMessageOnEnter = (event) => {
      if(event.key === 'Enter'){
        const newMessage = {type: 'postMessage', username: this.state.currentUser.name, content: event.target.value};
        this.socket.send(JSON.stringify(newMessage));
        event.target.value = '';
      }
    }

    onNameFieldBlur = (event) => {
      let oldName = this.state.currentUser.name;
      let newName = event.target.value;
      let changedName = {
          type: 'postNotification',
          notification: oldName + ' is now ' + newName
        }
      if (newName === '') {
        this.setState({currentUser: {name: Anonymous}});
      } else if (oldName !== newName) {

        this.setState({currentUser: {name: newName}});
        this.socket.send(JSON.stringify(changedName));
      }

    }

  componentDidMount = () => {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.onopen = () => {
      console.log('is connected');

    }

      this.socket.onmessage = (event) => {
        console.log('event.data:', event.data);
        const data = JSON.parse(event.data);
        const messages = this.state.messages.concat(data);

        switch(data.type) {
      case 'incomingMessage':
        const messages = this.state.messages.concat(data);
        console.log('messages:', messages);
        this.setState({messages: messages});
        break;
      case 'incomingNotification':
        const notification = this.state.messages.concat(data);
        this.setState({messages: notification});
        break;
      case 'incomingSize':
        const size = data.size;
        this.setState({client: size});
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error('Unknown event type ' + data.type);
    }
      }
  }
//console.log('this.state.messages:', {this.state.messages});
  render(){
    return (
      <div>
        <Nav size={this.state.client}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentName={this.state.currentUser.name} updateMessageOnEnter={this.updateMessageOnEnter} onNameFieldBlur={this.onNameFieldBlur}/>
      </div>
    );
  }
}

export default App;



