import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({
  id, name, message, onClose, onClick,
}) => (
  <div
    style={{
      position: 'fixed',
      top: '8px',
      right: '16px',
      zIndex: 10000,
      width: '300px',
    }}
    className="alert alert-info alert-dismissible"
  >
    <button onClick={onClose} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
    <div> { name }</div>
    <span onClick={() => onClick(id)}> { message }</span>
  </div>
);

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
