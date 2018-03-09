import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chat from './scenes/DashboardSection/Chat';
import { withRouter, Route } from 'react-router-dom';
import DashboardSection from '../dashboard/scenes/DashboardSection';
import LicenseSection from '../dashboard/scenes/LicenseSection';
import Header from '../../component/header';
import Sidebar from '../../component/sideNav';
import Footer from '../../component/footer';
import {
  addChatMessage, fetchChatMessage, fetchUsers, getWeather, removeChat, submitForm, submitMessage,
  updateFields,
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

  onFileChange = (evt) => {
    const { name, files } = evt.target;
    this.props.updateFields(name, files);
  };

  onOpenChat =(id) => {
    const { email } = this.getEmail();
    this.props.fetchChatMessage(this.sortData(id, email), id);
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

  sortData =(id, email) => {
    const sortedData = id.localeCompare(email);
    if (sortedData === -1) { return `${id}${email}`; }

    return `${email}${id}`;
  };

  sendChat =() => {
    const { email } = this.getEmail();
    const messageId = this.sortData(email, this.getChatUser());
    this.props.submitMessage(this.props
      .chat
      .chatData
      .message, messageId, this.props.user.userProfile);
  };

  handleFormError = () => {
    console.log('Error on form');
  };

  validateForm = (data) => {
    const { length } = Object.keys(data);

    if (length === 4) {
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
    const showSearch = this.props.user.userProfile.verified;
    const { email } = this.getEmail();
    const { length } = this.props.chat.chatData.chatOrder;

    return (
      <div className={`skin-blue sidebar-mini wrapper sidebar-${this.state.collapse}`}>
        <Header toggle={this.onToggleDashboard} />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Welcome
            </h1>
            Please Upload your License for Approval
          </section>
          { showSearch ?
            <DashboardSection users={this.props.users.allUsers} openChat={this.onOpenChat} coords={this.props.weather[0].coord} />
            :
            <LicenseSection
              verified={showSearch}
              onChangeFields={this.onChangeFields}
              onFile={this.onFileChange}
              onSubmit={this.onSubmit}
              email={email}
            />
          }
          <div>
            {this.props.chat.chatData.chatOrder.map((obj, index) => (<Chat
              onChat={this.onChat}
              input={this.props.chat.chatData.message}
              sendChat={this.sendChat}
              key={index.toString()}
              messages={this.props.chat.chatData[obj]}
              onRemove={this.onRemove}
              count={(length)}
            />))}
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
    addChatMessage: (message) => dispatch(addChatMessage(message)),
    fetchChatMessage: (id, userId) => dispatch(fetchChatMessage(id, userId)),
    fetchUsers: () => dispatch(fetchUsers()),
    getWeather: (city) => dispatch(getWeather(city)),
    remove: () => dispatch(removeChat()),
    submitForm: (data) => dispatch(submitForm(data)),
    submitMessage: (message, id, userProfile) => dispatch(submitMessage(message, id, userProfile)),
    updateFields: (keyPath, value) => dispatch(updateFields(keyPath, value)),
  };
}

function mapStateToProps(state) {
  return makeSelector(state);
}

Dashboard.propTypes = {
  addChatMessage: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    chatData: PropTypes.object,
  }).isRequired,
  fetchChatMessage: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  getWeather: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userProfile: PropTypes.object,
  }).isRequired,
  submitForm: PropTypes.func.isRequired,
  submitMessage: PropTypes.func.isRequired,
  updateFields: PropTypes.func.isRequired,
  data: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
  users: PropTypes.shape({
    allUsers: PropTypes.object,
  }).isRequired,
  weather: PropTypes.array.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
