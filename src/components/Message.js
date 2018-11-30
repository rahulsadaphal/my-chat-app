import React from 'react'

class Message extends React.Component {  
    render() {
        return (
            <div className="message">
                <div>{this.props.username}</div>
                <div>{this.props.text}</div>
            </div>
        )
    }
}

export default Message