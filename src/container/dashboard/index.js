import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chat from './scenes/DashboardSection/Chat';
import DashboardSection from '../dashboard/scenes/DashboardSection';
import LicenseSection from '../dashboard/scenes/LicenseSection';
import Header from '../../component/header';
import Sidebar from '../../component/sideNav';
import Footer from '../../component/footer';
import Notification from '../../component/notification';
import ProfileCard from '../../component/profileCard';

import {
  addChat,
  addChatMessage, addUser, approveUsers, fetchChatMessage, fetchUsers, getMapData, getWeather, registerPushNotification,
  rejectUsers,
  removeChat, searchUsers,
  sendNotification,
  submitForm,
  submitMessage, toggleVisibiliy,
  updateFields, updateStatus, updateStatusField,
} from './actions';
import { makeSelector } from './selector';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: '',
    };
  }

  componentWillMount() {
    this.props.getWeather('');
    this.props.fetchUsers();
  }

  componentDidMount() {
    const { email } = this.getEmail();
    if (email) {
      this.props.registerPushNotification(this.getEmail().email);
      this.props.getLocation(email);
    }
  }

  onToggleDashboard = () => {
    if (this.state.collapse === '') {
      this.setState({ collapse: 'collapse' });
    } else {
      this.setState({ collapse: '' });
    }
  };

  onChangeFields = (evt) => {
    const { name, value } = evt.target;
    this.props.updateFields(name, value);
  };

  onChangeSearch = (evt) => {
    const { name, value } = evt.target;
    this.props.searchUsers(value);
  };

  onCloseNotification = () => {

  };

  onFileChange = (evt) => {
    const { name, files } = evt.target;
    this.props.updateFields(name, files);
  };

  onOpenChat =(id) => {
    const { email } = this.getEmail();
    if (email) {
      this.props.fetchChatMessage(this.sortData(id, email), id);
    } else {
      this.props.addChat('abcd', this.props.users.allUsers[id], id);
    }
  };

  onOpenNotification = (id) => {
    this.onOpenChat(id);
  };

  onRemove =() => {
    this.props.remove();
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    const { data } = this.props.data;
    const valid = this.validateForm(data);
    const { email } = this.props.user.userProfile;
    (valid) ? this.props.submitForm(data, email) : this.handleFormError();
  };

  onChat = (evt) => {
    const { value } = evt.target;
    this.props.addChatMessage(value);
  };

  getChatUser = () => this.props.chat.chatData.chatOrder[this.props.chat.chatData.chatOrder.length - 1];

  getEmail = () => this.props.user.userProfile;

  approveUser = (evt, id) => {
    evt.preventDefault();
    this.props.approveUsers(id);
  };

  rejectUser = (evt, id) => {
    evt.preventDefault();
    this.props.remove();
    this.props.rejectUsers(id);
  };

  changeStatusField =(evt) => {
    const { checked, value, name } = evt.target;
    const { email } = this.getEmail();
    if (!checked) {
      if (name) {
        this.props.updateStatusField(value);
      } else {
        this.props.toggleVisibility(email, false);
      }
    } else {
      this.props.toggleVisibility(email, true);
    }
  };

  sortData =(id, email) => {
    const sortedData = id.localeCompare(email);
    if (sortedData === -1) { return `${id}${email}`; }

    return `${email}${id}`;
  };

  searchUser = (e) => {
    e.preventDefault();
    debugger
  };

  sendChat =() => {
    const { email } = this.getEmail();
    const messageId = this.sortData(email, this.getChatUser());
    const { token, verified } = this.props.users.allUsers[this.getChatUser()];
    if (verified && token) {
      const { message } = this.props.chat.chatData;
      this.props.submitMessage(message, messageId, this.props.user.userProfile);
      this.props.sendNotification(token, { message, userProfile: this.props.user.userProfile });
    } else {
      alert('You can only send Messages to a verified user');
    }
  };

  handleFormError = () => {
    console.log('Error on form');
  };

  updateStatus = () => {
    const { email } = this.getEmail();
    this.props.updateStatus(email, this.props.status.update);
  };

  validateForm = (data) => {
    const { length } = Object.keys(data);

    if (length === 3) {
      const error = [];
      Object.keys(data).filter((obj) => {
        const props = data[obj];
        if (!props) {
          error.push(obj);
        }
      });
      return error.length <= 1;
    }
    return false;
  };

  render() {
    const adminEmail = this.props.admin.adminProfile.email;
    const { email } = this.getEmail();
    if (adminEmail && !email) {
      return (
        <div className="skin-blue sidebar-mini wrapper sidebar-collapse">
          <Header toggle={this.onToggleDashboard} />
          <Sidebar
            photoUrl=""
            onSubmit={() => {}}
            onChange={() => {}}
            status="Admin User"
          />
          <div className="content-wrapper">
            <section className="content-header">
              <h1>
                Welcome
              </h1>
              Admin Section
            </section>
            <DashboardSection
              users={this.props.users.allUsers}
              openChat={this.onOpenChat}
              admin
              coords={{
                latitude: this.props.weather[0].coord.lat,
                longitude: this.props.weather[0].coord.lon,
              }}
            />
            <div>
              {this.props.chat.chatData.chatOrder.map((obj, index) => (<ProfileCard
                approve={this.approveUser}
                reject={this.rejectUser}
                key={index.toString()}
                data={this.props.users.allUsers[obj]}
                onClose={this.onRemove}
              />))}
            </div>
          </div>
          <Footer />
          <div className="control-sidebar-bg"></div>
        </div>
      );
    }


    const showSearch = this.props.user.userProfile.verified;
    const { displayName, longitude, latitude } = this.props.user.userProfile;
    const { length } = this.props.chat.chatData.chatOrder;

    if (!longitude || !latitude) {
      // latitude = this.props.weather[0].coord.latitude;
      // longitude = this.props.weather[0].coord.longitude;
    }

    return (
      <div className={`skin-blue sidebar-mini wrapper sidebar-${this.state.collapse}`}>
        <Header toggle={this.onToggleDashboard} />
        <Sidebar
          photoUrl={this.props.user.userProfile.photoURL}
          onSubmit={this.updateStatus}
          onChange={this.changeStatusField}
          status={this.props.user.userProfile.status}
        />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Welcome
            </h1>
            Please Upload your License for Approval
          </section>
          { showSearch ?
            <DashboardSection
              users={this.props.users.allUsers}
              openChat={this.onOpenChat}
              coords={{ latitude: longitude, longitude: latitude }}
              searchUsers={this.searchUser}
              onChange={this.onChangeSearch}
            />
            :
            <LicenseSection
              verified={showSearch}
              onChangeFields={this.onChangeFields}
              onFile={this.onFileChange}
              onSubmit={this.onSubmit}
              email={email}
              name={displayName}
            />
          }
          <div>
            {this.props.chat.chatData.chatOrder.map((obj, index) => (<Chat
              onChat={this.onChat}
              input={this.props.chat.chatData.message}
              sendChat={this.sendChat}
              key={index.toString()}
              messages={this.props.chat.chatData[obj]}
              name={displayName}
              onRemove={this.onRemove}
              count={(length)}
            />))}
          </div>
          <div>
            { (this.props.notification.notif && this.props.notification.notif.body) ?
              <Notification
                onClick={this.onOpenNotification}
                id={this.props.notification.notif.body.email}
                name={this.props.notification.notif.body.displayName}
                message={this.props.notification.notif.body.message}
                onClose={this.onCloseNotification}
              />
              : null
            }
          </div>
        </div>
        <Footer />
        <div className="control-sidebar-bg"></div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addChat: (id, value, userId) => dispatch(addChat(id, value, userId)),
    addUser: (user) => dispatch(addUser(user)),
    approveUsers: (id) => dispatch(approveUsers(id)),
    addChatMessage: (message) => dispatch(addChatMessage(message)),
    fetchChatMessage: (id, userId) => dispatch(fetchChatMessage(id, userId)),
    fetchUsers: () => dispatch(fetchUsers()),
    getWeather: (city) => dispatch(getWeather(city)),
    getLocation: (id) => dispatch(getMapData(id)),
    rejectUsers: (id) => dispatch(rejectUsers(id)),
    remove: () => dispatch(removeChat()),
    registerPushNotification: (id) => dispatch(registerPushNotification(id)),
    searchUsers: (users) => dispatch(searchUsers(users)),
    sendNotification: (token, body) => dispatch(sendNotification(token, body)),
    submitForm: (data, id) => dispatch(submitForm(data, id)),
    submitMessage: (message, id, userProfile) => dispatch(submitMessage(message, id, userProfile)),
    toggleVisibility: (id, status) => dispatch(toggleVisibiliy(id, status)),
    updateFields: (keyPath, value) => dispatch(updateFields(keyPath, value)),
    updateStatusField: (value) => dispatch(updateStatusField(value)),
    updateStatus: (id, status) => dispatch(updateStatus(id, status)),
  };
}

function mapStateToProps(state) {
  return makeSelector(state);
}

Dashboard.propTypes = {
  addChat: PropTypes.func.isRequired,
  addChatMessage: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  admin: PropTypes.shape({
    adminProfile: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      error: PropTypes.string,
    }),
  }).isRequired,
  approveUsers: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    chatData: PropTypes.object,
  }).isRequired,
  getLocation: PropTypes.func.isRequired,
  fetchChatMessage: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  getWeather: PropTypes.func.isRequired,
  notification: PropTypes.shape({
    notif: PropTypes.object,
  }).isRequired,
  remove: PropTypes.func.isRequired,
  registerPushNotification: PropTypes.func.isRequired,
  rejectUsers: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userProfile: PropTypes.object,
  }).isRequired,
  searchUsers: PropTypes.func.isRequired,
  sendNotification: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  submitMessage: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  updateFields: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
  updateStatusField: PropTypes.func.isRequired,
  data: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
  users: PropTypes.shape({
    allUsers: PropTypes.object,
  }).isRequired,
  weather: PropTypes.array.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
