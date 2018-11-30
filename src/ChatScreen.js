import React from 'react'
import Chatkit from '@pusher/chatkit'
import {instanceLocator } from './config'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'


class ChatScreen extends React.Component{

    constructor(){
        super()
        this.state = {
            messages : []
        }
    }



    componentDidMount () {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate'
            }),
            
        })

        chatManager
            .connect()
            .then(currentUser => {
                console.log('currentUser', currentUser)
                currentUser.subscribeToRoom({
                    roomId: 19374672,
                    //messageLimit: 10,
                    hooks: {
                        onNewMessage: message => {
                            console.log('message.text', message.text);
                            this.setState({
                                messages : [...this.state.messages, message]
                            })
                        }
                    }
                })
            })
            .catch(error => console.log(error))
    }
    render(){
        return(
            <div>
                <h1>Chat</h1>
                <p>Hello, {this.props.currentUsername}</p>
                
                <RoomList />
                <MessageList messages = {this.state.messages} />
                <SendMessageForm />
                <NewRoomForm />
            
            </div>
        )
    }
}

export default ChatScreen







