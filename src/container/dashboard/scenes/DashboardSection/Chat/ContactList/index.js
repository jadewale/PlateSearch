import React from 'react';
import Proptypes from 'prop-types';

const MessageList = ({ data }) => {
  const {
    name, time, message, photoURL,
  } = data;
  return (
    <li>
      <a href="/">
        <img className="contacts-list-img" src={photoURL} alt="Contact" />
        <div className="contacts-list-info">
          <span className="contacts-list-name">
            { name }
            <small className="contacts-list-date pull-right">{ time }</small>
          </span>
          <span className="contacts-list-msg">{ message }</span>
        </div>
      </a>
    </li>
  );
};

MessageList.propTypes = {
  data: Proptypes.shape({
    name: Proptypes.string.isRequired,
    time: Proptypes.string.isRequired,
    img: Proptypes.string,
  }).isRequired,
};

const ContactList = ({ data }) => (
  <ul className="contacts-list">
    {data.map((obj) => (<MessageList data={obj} />))}
  </ul>
);

ContactList.propTypes = {
  data: Proptypes.array.isRequired,
};

export default ContactList;
