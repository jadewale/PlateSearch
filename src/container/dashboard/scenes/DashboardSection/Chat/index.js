import React from 'react';
import PropTypes from 'prop-types';
import ChatBox from './ChatBox/index';
import ChatHeader from './ChatBox/ChatHeader';
import ChatFooter from './ChatBox/ChatFooter';

const Chat = ({
  count, input, messages, name, onChat, sendChat, onRemove,
}) => {
  const getuserAddress = (data) => {
    const filtered = data.filter((user) => user.userProfile.displayName !== name);
    if (filtered.length >= 1) { return filtered[0].userProfile.address; }

    return '';
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
      }}
      className="col-md-3"
    >
      <div className="box box-primary direct-chat direct-chat-primary">
        <div className="box-header with-border">
          <h3 className="box-title">Direct Chat</h3>
          <h6>{getuserAddress(messages)}</h6>
          <ChatHeader count={count} onRemove={onRemove} />
        </div>
        <div className="box-body">
          <div className="direct-chat-messages">
            {
              messages.map((obj) => (
                <ChatBox
                  data={{
                    name: obj.userProfile.displayName,
                    time: '27/01/2017',
                    photoURL: obj.userProfile.photoURL,
                    message: obj.message,
                    style: (obj.userProfile.displayName === name) ? 'right' : 'left',
                  }}
                />
              ))
            }
          </div>
          <div className="direct-chat-contacts">

          </div>
        </div>
        <div className="box-footer">
          <ChatFooter onChat={onChat} input={input} sendChat={sendChat} />
        </div>
      </div>
    </div>
  );
};
Chat.propTypes = {
  count: PropTypes.number.isRequired,
  input: PropTypes.string,
  messages: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChat: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  sendChat: PropTypes.func.isRequired,
};

Chat.defaultProps = {
  input: '',
};

export default Chat;
