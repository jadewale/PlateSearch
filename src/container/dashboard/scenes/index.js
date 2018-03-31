import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import AuthService from '../../../services/AuthService';

import {
  addChat,
  addChatMessage, addErrorMessages, addUser, approveUsers, fetchChatMessage, fetchUsers, getMapData, getWeather,
  registerPushNotification,
  rejectUsers,
  removeChat, searchUsers,
  sendNotification,
  submitForm,
  submitMessage, toggleVisibiliy,
  updateFields, updateOffence, updateStatus, updateStatusField,
} from '../actions';
import { makeSelector } from '../selector';
import Admin from '../../admin/scenes/dashboard/index';
import Users from '../../user/scenes/dashboard';
import { updateGeoLocationAddress } from '../../user/actions';

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
    const valid = this.onCheckValidation(name, value);
    if (valid) {
      this.props.updateFields(name, value);
      this.props.addErrorMessage('');
      return;
    }
    this.props.addErrorMessage(`Invalid ${name} 
      Data passed in. Format should be ${this.onShowErrorMessage(name)}`);
  };

  onCheckValidation = (data, value) => {
    switch (data) {
      case 'expiration': return (this.onDateValidation(value) && this.onPresentDateValidation(value));
      case 'license': return this.onLicenseValidation(value.trim());
      default:
        return true;
    }
  };

  onLicenseValidation = (license) => license.match(/^[a-zA-Z]{3}[-]\d{3}[a-zA-Z]{2}$/g);

  onDateValidation = (date) => date.match(/^\d{4}([./-])\d{2}\1\d{2}$/g);

  onPresentDateValidation = (dateString) => new Date(dateString) > new Date();

  onChangeOffence = (evt, id) => {
    let { value } = evt.target;
    if (value === '--clear--') { value = ''; }
    this.props.updateOffence(value, id);
  };

  onShowErrorMessage = (data) => {
    switch (data) {
      case 'expiration': return '(DD/MM/YYYY) and should be greater than today';
      case 'license': return 'AAA-111MD';
      default:
        return '';
    }
  };

  onChangeSearch = (evt) => {
    const { value } = evt.target;
    this.props.searchUsers(value);
    this.props.addUser([]);
  };

  onCloseNotification = () => {

  };

  onFileChange = (evt) => {
    const { name, files } = evt.target;
    this.props.updateFields(name, files);
  };

  onLogout = (e) => {
    e.preventDefault();
    const logout = window.confirm('Are you sure you want to logout');
    if (logout) {
      AuthService.logout();
    }
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
    this.props.remove();
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
    const key = this.props.users.search;

    const values = Object.values(this.props.users.allUsers).filter((obj) => {
      if (obj.verified && obj.license && obj.license.toLowerCase() === key.toLowerCase()) {
        return true;
      }
      return false;
    });

    this.props.addUser(values);
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

    if (length >= 3) {
      const error = [];
      Object.keys(data).filter((obj) => {
        const props = data[obj];
        const errorResponse = this.onCheckValidation(obj, data[obj]);

        if (!errorResponse) {
          this.props.addErrorMessage(`Invalid ${obj} 
            Data passed in. Format should be ${this.onShowErrorMessage(data[obj])}`);
          error.push(obj);
        }
        if (!props) {
          error.push(obj);
        }
      });
      return error.length <= 1;
    }
    return false;
  };

  render() {

    if (!AuthService.isAuthenticated) {
      return <Redirect to="login" />;
    }

    const adminEmail = this.props.admin.adminProfile.email;
    const { email } = this.getEmail();
    if (adminEmail && !email) {
      return (
        <Admin
          func={{
            approveUser: this.approveUser,
            rejectUser: this.rejectUser,
            onToggleDashboard: this.onToggleDashboard,
            onOpenChat: this.onOpenChat,
            onRemove: this.onRemove,
            onChangeOffence: this.onChangeOffence,
            onLogout: this.onLogout,
          }}
          variables={{
            users: this.props.users,
            weather: this.props.weather[0].coord,
            chatOrder: this.props.chat.chatData.chatOrder,
          }}
        />
      );
    }

    return (
      <Users
        func={{
          updateStatus: this.updateStatus,
          changeStatusField: this.changeStatusField,
          onOpenChat: this.onOpenChat,
          searchUser: this.searchUser,
          onChangeSearch: this.onChangeSearch,
          onChangeFields: this.onChangeFields,
          onFileChange: this.onFileChange,
          onSubmit: this.onSubmit,
          onChat: this.onChat,
          sendChat: this.sendChat,
          onLogout: this.onLogout,
          onRemove: this.onRemove,
          onOpenNotification: this.onOpenNotification,
          onCloseNotification: this.onCloseNotification,
          onToggleDashboard: this.onToggleDashboard,
          updateGeolocationAddress: this.props.updateGeolocationAddress,
        }}
        variables={{
          error: this.props.error,
          collapse: this.state.collapse,
          userProfile: this.props.user.userProfile,
          chatData: this.props.chat.chatData,
          users: this.props.users,
          notification: this.props.notification,
        }}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addChat: (id, value, userId) => dispatch(addChat(id, value, userId)),
    addUser: (user) => dispatch(addUser(user)),
    approveUsers: (id) => dispatch(approveUsers(id)),
    addChatMessage: (message) => dispatch(addChatMessage(message)),
    addErrorMessage: (msg) => dispatch(addErrorMessages(msg)),
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
    updateGeolocationAddress: (id, address) => dispatch(updateGeoLocationAddress(id, address)),
    updateOffence: (keyPath, value) => dispatch(updateOffence(keyPath, value)),
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
  addErrorMessage: PropTypes.func.isRequired,
  approveUsers: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    chatData: PropTypes.object,
  }).isRequired,
  error: PropTypes.shape(({
    message: PropTypes.string,
  })).isRequired,
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
  updateOffence: PropTypes.func.isRequired,
  updateGeolocationAddress: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
  updateStatusField: PropTypes.func.isRequired,
  data: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
  users: PropTypes.shape({
    allUsers: PropTypes.object,
    display: PropTypes.array,
    search: PropTypes.string.isRequired,
  }).isRequired,
  weather: PropTypes.array.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
