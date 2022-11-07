const MessageContainer = ({message}) => {
    return <div className="message-container">
       {messages.map(m,index) =>
         <div key={index} className="user-message">
              <div className="message bg-primary">
                {m.message}
              </div>
         </div>
       }
    </div>
}