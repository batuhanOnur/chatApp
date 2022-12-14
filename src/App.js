import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const App = () => {

  const [connection, setConnection] = useState();
  const [messages,setMessages] = useState([]);

  const joinRoom = async(user,room) => {

    try{

     const connection = new HubConnectionBuilder()
     .withUrl("https://localhost:44334/chat")
     .configureLogging(LogLevel.Information)
     .build();

     connection.on("ReceiveMessage", (user,message) => {
      setMessages(messages => [...messages, {user, message}])
     })

     await connection.start();
     await connection.invoke("JoinRoom",{user,room})

     setConnection(connection);

    } catch(e){
      console.log(e)
    }
  }

  return <div className="app">
    <h2>MyChat</h2>
    <hr className='line' />
    <Lobby joinRoom={joinRoom}/>
  </div>
}

export default App;
