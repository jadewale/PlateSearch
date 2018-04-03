import React from 'react';
import PropTypes from 'prop-types';
import Maps from './Maps';
import RecommendedUsers from './RecommendedUsers';
import FindUsers from './FindUsers';

class DashboardSection extends React.Component {
  componentDidMount() {
    const steps = [
      {
        title: 'Map',
        text: 'View Other Users on the map and click on a car icon to see more details on the users. <br/> ' +
        '',
        selector: '.first-action',
        position: 'right',
        type: 'hover',
        style: {
          zIndex: 10000,
          height: 20,
        },
      },
      {
        title: 'Search Users',
        text: 'Search for users via license. Only Verified users can use this feature.<br/> Hit Next for tip',
        selector: '.card-action',
        position: 'right',
        style: {
          zIndex: 10000,
          height: 20,
        },
      },
      {
        title: 'Message',
        text: 'Click on a user to chat with the Users. Only verified users can send messages.<br/> Hit Next for tip',
        selector: '.third-chat',
        position: 'right',
        style: {
          zIndex: 10000,
          height: 20,
        },
      },
      {
        title: 'Status',
        text: 'You can update your status for other users to see. Only Verified users can use benefit from this feature.<br/> Hit Next for tip',
        selector: '.fourth-step',
        position: 'right',
        style: {
          zIndex: 10000,
          height: 20,
        },
      }, {
        title: 'Logout',
        text: 'Logout. Congratulations you have completed the tour',
        selector: '.fifth-step',
        position: 'left',
        style: {
          zIndex: 10000,
          height: 20,
        },
      },

    ];


    this.props.addSteps(steps);
  }

  handleClick = (e) => {
    e.preventDefault();
    const { next } = this.props;

    next();
  };


  render() {
    const {
      admin, coords, display, users, openChat, onChange, searchUsers, address, onToggleInfoDisplay,
    } = this.props;
    return (
      <section className="content">
        <div className="box">
          <div className="box-header with-border">
            <h3 className="box-title">{address || ''}</h3>

            <div className="box-tools pull-right">
              <button
                type="button"
                className="btn btn-box-tool"
                data-widget="collapse"
                data-toggle="tooltip"
                title="Collapse"
              >
                <i className="fa fa-minus"></i>
              </button>
              <button
                type="button"
                className="btn btn-box-tool"
                data-widget="remove"
                data-toggle="tooltip"
                title="Remove"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
          <div className="box-body">
            <div className="row">
              <div className="col-md-8 first-action">
                <Maps
                  coords={coords}
                  userlocation={{
                    lat: coords.latitude,
                    lng: coords.longitude,
                  }}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.30&key=AIzaSyAlI8N49LxlVUexUywuoR2CtukrbVKNbY4"
                  loadingElement={<div>Loading</div>}
                  allUsers={users}
                  containerElement={<div style={{ height: '400px' }} />}
                  mapElement={<div style={{ height: '100%' }} />}
                  isMarkerShown
                  onToggleInfoDisplay={onToggleInfoDisplay}
                />
              </div>
              <div className="col-md-4">
                <FindUsers openChat={openChat} display={display} searchUsers={searchUsers} onChange={onChange} />
                <RecommendedUsers
                  admin={admin}
                  currentLocation={{ latitude: coords.latitude, longitude: coords.longitude }}
                  openChat={openChat}
                  users={users}
                />
              </div>
              <div className="col-md-6">
              </div>
            </div>
          </div>
          <div className="box-footer">
          </div>
        </div>
      </section>
    );
  }
}

DashboardSection.propTypes = {
  address: PropTypes.string,
  addSteps: PropTypes.func.isRequired,
  addTooltip: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  selector: PropTypes.string.isRequired,
  coords: PropTypes.object.isRequired,
  display: PropTypes.array,
  openChat: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleInfoDisplay: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  users: PropTypes.object,
};

DashboardSection.defaultProps = {
  address: '',
  users: {},
  display: {},
};

export default DashboardSection;
