import React from 'react';
import PropTypes from 'prop-types';

const RecomendedUser = ({ admin, users, openChat }) => {
  let displayMessage = 'Recommended Members';
  if (admin) { displayMessage = 'All Memebers'; }

  return (
    <div className="box box-danger">
      <div className="box-header with-border">
        <h3 style={{ fontSize: '8px' }} className="box-title">{ displayMessage }</h3>

        <div className="box-tools pull-right">
          <span className="label label-danger">{`${Object.keys(users).length} Members`}</span>
          <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
          </button>
          <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      <div className="box-body no-padding">
        <ul className="users-list clearfix">
          {Object.keys(users).map((data) => (
            <li key={data} onClick={() => { openChat(data); }}>
              <img
                className="img-circle"
                src={users[data].photoURL || 'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png'}
                alt="User"
              />
              <span className="users-list-name">{users[data].displayName || users[data].email}</span>
              <span className="users-list-date">{users[data].license}</span>
            </li>
          ))}

        </ul>
      </div>
      <div className="box-footer text-center">
        <a href="/" className="uppercase"></a>
      </div>
    </div>
  );
};

RecomendedUser.propTypes = {
  admin: PropTypes.func,
  openChat: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

RecomendedUser.defaultProps = {
  admin: false,
};

export default RecomendedUser;
