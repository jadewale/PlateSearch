import React from 'react';
import Geocode from 'react-geocode';
import PropTypes from 'prop-types';
import Header from '../../../../component/header';
import Sidebar from '../../../../component/sideNav';
import Chat from '../../../dashboard/scenes/DashboardSection/Chat';
import DashboardSection from '../../../dashboard/scenes/DashboardSection';
import Footer from '../../../../component/footer';
import Notification from '../../../../component/notification';
import LicenseSection from '../../../dashboard/scenes/LicenseSection';
import Rate from '../../../../component/rating';

Geocode.setApiKey('AIzaSyAlI8N49LxlVUexUywuoR2CtukrbVKNbY4');

const Users = (props) => {
  const {
    displayName, address, longitude, latitude, offence, verified: showSearch, file, email, photoURL, status,
  } = props.variables.userProfile;
  const { length } = props.variables.chatData.chatOrder;
  const {
    addSteps, addTooltip, next, onClickSwitch,
  } = props.func;

  if (!longitude || !latitude) {
    // latitude = this.props.weather[0].coord.latitude;
    // longitude = this.props.weather[0].coord.longitude;
  }

  const getGeo = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const geoAddress = response.results[0].formatted_address;
        props.func.updateGeolocationAddress(email, geoAddress);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  getGeo(latitude, longitude);

  return (
    <div>
      <Header toggle={props.func.onToggleDashboard} prompt={props.func.onLogout} />
      <Sidebar
        photoUrl={photoURL}
        onSubmit={props.func.updateStatus}
        onChange={props.func.changeStatusField}
        status={status}
        weather={props.variables.weather}
      />
      <div  className="content-wrapper">
        <section className="content-header">
          <h1>
            Welcome
          </h1>
          { offence ? <span className="text-danger">Your Offence is {offence}</span> : 'Please Upload your License for Approval'}
          <div>
            <Rate
              rating={[{ color: 'yellow' }, { color: 'yellow' }, { color: 'yellow' }, { color: 'yellow' }, { color: 'yellow' }]}
            />
          </div>
        </section>
        { file ?
          <DashboardSection
            address={address}
            addSteps={addSteps}
            next={next}
            addTooltip={addTooltip}
            verified={showSearch}
            users={props.variables.users.allUsers}
            openChat={props.func.onOpenChat}
            coords={{ latitude, longitude }}
            searchUsers={props.func.searchUser}
            onChange={props.func.onChangeSearch}
            display={props.variables.users.display && props.variables.users.display[0]}
            onToggleInfoDisplay={props.func.onToggleInfoDisplay}
          />
          :
          <LicenseSection
            addSteps={addSteps}
            next={next}
            addTooltip={addTooltip}
            verified={showSearch}
            onChangeFields={props.func.onChangeFields}
            onFile={props.func.onFileChange}
            onSubmit={props.func.onSubmit}
            onClickSwitch={onClickSwitch}
            email={email}
            name={displayName}
            error={props.variables.error}
          />
        }
        <div>
          {props.variables.chatData.chatOrder.map((obj, index) => (<Chat
            onChat={props.func.onChat}
            input={props.variables.chatData.message}
            sendChat={props.func.sendChat}
            key={index.toString()}
            messages={props.variables.chatData[obj]}
            name={displayName}
            onRemove={props.func.onRemove}
            count={(length)}
          />))}
        </div>
        <div>
          { (props.variables.notification.notif && props.variables.notification.notif.body) ?
            <Notification
              onClick={props.func.onOpenNotification}
              id={props.variables.notification.notif.body.email}
              name={props.variables.notification.notif.body.displayName}
              message={props.variables.notification.notif.body.message}
              onClose={props.func.onCloseNotification}
            />
            : null
          }
        </div>
        <div style={{ display: 'none' }}>
          <div className="col-lg-3 col-xs-6">
            <div className="small-box bg-aqua">
              <div className="inner">
                <h3>44</h3>

                <p>User Registrations</p>
              </div>
              <div className="icon">
                <i className="fa fa-shopping-cart"></i>
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fa fa-arrow-circle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="control-sidebar-bg"></div>
    </div>
  );
};

Users.propTypes = {
  func: PropTypes.shape({
    addSteps: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired,
    changeStatusField: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    searchUser: PropTypes.func.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    onFileChange: PropTypes.func.isRequired,
    onChangeFields: PropTypes.func.isRequired,
    onToggleDashboard: PropTypes.func.isRequired,
    onOpenChat: PropTypes.func.isRequired,
    onChat: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onOpenNotification: PropTypes.func.isRequired,
    onCloseNotification: PropTypes.func.isRequired,
    onToggleInfoDisplay: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    sendChat: PropTypes.func.isRequired,
    updateGeolocationAddress: PropTypes.func.isRequired,
  }).isRequired,
  variables: PropTypes.shape({
    collapse: PropTypes.string.isRequired,
    error: PropTypes.object.isRequired,
    userProfile: PropTypes.object.isRequired,
    chatData: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    notification: PropTypes.shape({
      notif: PropTypes.shape({
        body: PropTypes.object,
      }),
    }).isRequired,
  }).isRequired,
  weather: PropTypes.object.isRequired,
};

export default Users;
