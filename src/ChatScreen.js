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
            roomId: null,
            messages : [],
            joinableRooms: [],
            joinedRooms: []
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
    }



    componentDidMount () {
        

        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate'
            })
        })
        
        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser
            
            this.getRooms()
           
            
        })
        .catch(err => console.log('error on connecting: ', err))
    }

    getRooms() {
        this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
            this.setState({
                joinableRooms,
                joinedRooms: this.currentUser.rooms
            })
        })
        .catch(err => console.log('error on joinableRooms: ', err))
    }


    subscribeToRoom(roomId) {
        this.setState({ messages: [] })
        this.currentUser.subscribeToRoom({
            roomId,
            hooks: {
                onNewMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
        .then(room => {
           
                this.setState({
                    roomId: room.id
                })
            this.getRooms()
        })
        .catch(err => console.log('error on subscribing to room: ', err))
    }

    sendMessage(text){
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        })
    }


    render(){
        return(
            <div>
                <h1>Chat</h1>
                <p>Hello, {this.props.currentUsername}</p>
                
                <RoomList 
                subscribeToRoom={this.subscribeToRoom}
                rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
                <MessageList messages = {this.state.messages} />
                <SendMessageForm sendMessage={this.sendMessage} />
                <NewRoomForm />
            
            </div>
        )
    }
}

export default ChatScreen







