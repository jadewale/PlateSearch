import React from 'react';
import PropTypes from 'prop-types';
import geolib from 'geolib';

const RecomendedUser = ({
  admin, users, openChat, currentLocation,
}) => {
  let displayMessage = 'Recommended Members';
  if (admin) { displayMessage = 'All Memebers'; }

  const displayUsersNear = (data, usersLocation) => {
    const {
      latitude, longitude, photoURL, email, displayName, license,
    } = data;
    if (latitude && longitude) {
      const distance = geolib.getDistance({ latitude, longitude }, usersLocation);
      if (distance <= 70858) {
        return (
          <li key={email} onClick={() => { openChat(email); }}>
            <img
              className="img-circle"
              src={photoURL || 'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png'}
              alt="User"
            />
            <span className="users-list-name">{displayName || email}</span>
            <span className="users-list-date">{license}</span>
          </li>
        );
      }
    }

    return null;
  };

  return (
    <div className="box box-danger">
      <div className="box-header with-border third-chat">
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
          {Object.keys(users).map((data) => displayUsersNear(users[data], currentLocation))}
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
  currentLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

RecomendedUser.defaultProps = {
  admin: false,
};

export default RecomendedUser;
