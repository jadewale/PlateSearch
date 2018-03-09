import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ onChat, sendChat, input }) => (
  <form onSubmit={(e) => { e.preventDefault(); sendChat(); }}>
    <div className="input-group">
      <input type="text" onChange={onChat} value={input} name="message" placeholder="Type Message ..." className="form-control" />
      <span className="input-group-btn">
        <button type="button" onClick={sendChat} className="btn btn-primary btn-flat">Send</button>
      </span>
    </div>
  </form>
);
Footer.propTypes = {
  onChat: PropTypes.func.isRequired,
  sendChat: PropTypes.func.isRequired,
  input: PropTypes.string,
};

Footer.defaultProps = {
  input: '',
};

export default Footer;
