import React from 'react';
import PropTypes from 'prop-types';
import ChatBox from './ChatBox/index';
import ChatHeader from './ChatBox/ChatHeader';
import ChatFooter from './ChatBox/ChatFooter';

const Chat = ({
  count, input, messages, onChat, sendChat, onRemove,
}) => (
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
        <ChatHeader count={count} onRemove={onRemove} />
      </div>
      <div className="box-body">
        <div className="direct-chat-messages">
          <ChatBox
            data={messages || {
              name: 'Jolaade', time: '27/01/2017', img: '', message: 'hello World',
            }}
          />
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

Chat.propTypes = {
  count: PropTypes.number.isRequired,
  input: PropTypes.string,
  messages: PropTypes.array.isRequired,
  onChat: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  sendChat: PropTypes.func.isRequired,
};

Chat.defaultProps = {
  input: '',
};

export default Chat;
