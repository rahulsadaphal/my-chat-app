import React from 'react'
import Message from './Message.js'

// const DUMMY_DATA = [
//     {
//         senderId: 'perborgen',
//         text: 'Hey, how is it going?'
//     },
//     {
//         senderId: 'janedoe',
//         text: 'Great! How about you?'
//     },
//     {
//         senderId: 'perborgen',
//         text: 'Good to hear! I am great as well'
//     }
// ]

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message key={index} username={message.senderId} text={message.text} />
                        // <div key={index}>
                        // <div>{message.senderId}</div>
                        // <div>{message.text}</div>
                        // </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList