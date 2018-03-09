import React from 'react';
import PropTypes from 'prop-types';

const ChatHeader = ({ count, onRemove }) => (
  <div className="box-tools pull-right">
    <span data-toggle="tooltip" title="" className="badge bg-light-blue" data-original-title="3 New Messages"> { count }</span>
    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
    </button>
    <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="" data-widget="chat-pane-toggle" data-original-title="Contacts">
      <i className="fa fa-comments"></i>
    </button>
    <button type="button" onClick={onRemove} className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
  </div>
);

ChatHeader.propTypes = {
  count: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ChatHeader;
