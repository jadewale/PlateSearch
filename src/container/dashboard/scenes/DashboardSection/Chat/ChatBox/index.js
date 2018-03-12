import React from 'react';
import Proptypes from 'prop-types';

const ChatBox = ({ data }) => {
  const {
    name, time, message, photoURL, style,
  } = data;
  return (
    <div className={`direct-chat-msg ${style}`}>
      <div className="direct-chat-info clearfix">
        <span className={`direct-chat-name pull-${style}`}>{ name }</span>
        <span className={`direct-chat-timestamp pull-${(style === 'right') ? 'left' : 'right'}`}>{ time }</span>
      </div>
      <img className="direct-chat-img" src={photoURL || 'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png'} alt="Message" />
      <div className="direct-chat-text">
        { message }
      </div>
    </div>
  );
};

ChatBox.propTypes = {
  data: Proptypes.shape({
    name: Proptypes.string.isRequired,
    message: Proptypes.string.isRequired,
    time: Proptypes.string.isRequired,
    img: Proptypes.string,
    style: Proptypes.string,
  }).isRequired,
};

export default ChatBox;
