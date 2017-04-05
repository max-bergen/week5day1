import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
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
      ]
    }
  }
    handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        //console.log('enter press here!');
        const newMessage = {id: this.state.messages.length +1, username: this.state.currentUser.name, content: event.target.value};
        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
        this.socket.send(JSON.stringify(newMessage));
        event.target.value = '';
      }
    }




  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onopen = () => {
      console.log("is connected");
      //this.socket.send("hi");


    }
    //socket.send("Connected to server");
    console.log("componentDidMount <App />");

      this.socket.onmessage = (messageEvent) => {
        console.log(messageEvent.data);

        this.setState({messages: messages})
      }
  }



  render(){
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentName={this.state.currentUser.name} keyPress={this.handleKeyPress}/>
      </div>
    );
  }
}

export default App;



