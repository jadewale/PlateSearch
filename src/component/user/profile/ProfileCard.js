
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { viewLicense, sendMessage, receiveMessage, openModal, closeModal, displayMessages } from '../../../actions/userActions';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import firebase from 'firebase';
let chatId = '';


const ProfileCard = ({
  name, model, license, email, openChat, profile,
}) => (
  <div style={{ marginTop: '20px' }} className="col-md-4">
    <div className="box-body box-profile">
      <img className="profile-user-img img-responsive img-circle" src="http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png" alt="User profile picture" />

      <h3 className="profile-username text-center">{name}</h3>

      <p className="text-muted text-center">{email}</p>

      <ul className="list-group list-group-unbordered">
        <li className="list-group-item">
          <b>Name</b> <a className="pull-right">{name}</a>
        </li>
        <li className="list-group-item">
          <b>Model</b> <a className="pull-right">{model}</a>
        </li>
        <li className="list-group-item">
          <b>License</b> <a className="pull-right">{license}</a>
        </li>
      </ul>
      <button onClick={openChat} className="btn btn-primary btn-block"><b>Chat</b></button>
      <button onClick={() => { profile(name, model, license, email); }} className="btn btn-primary btn-block"><b>View Profile</b></button>
    </div>
  </div>
);

class SearchBox extends React.Component {
    searchInput = (evt) => {
      this.setState({ searchWord: evt.target.value });
    };
    triggerChat = (user) => {
      chatId = user;
      this.setState({ chat: 'block' });
    };
    handleNewUserMessage = (newMessage) => {
      this.props.sendMessage(chatId, { message: newMessage, user: chatId, sender: this.props.user.email });
    };
    addNewMessage= (message) => {
      this.handleNewUserMessage('Hi');
    };
    notify = () => {
      toast('Wow so easy !', { autoClose: 5000 });
    };
    onFormSubmit = (evt) => {
      evt.preventDefault();
      this.triggerSearch(); // searchWord
    };
    triggerSearch = () => {
      if (this.props.user.verified !== true) {
        if (this.props.user.verified === 'deactivated') {
          toast('Your account has been deactivated', { autoClose: 5000 });
        } else {
          toast('Your account has not been verified', { autoClose: 5000 });
        }
      } else {
        const data = this.state.searchWord;
        if (data) {
          const dataFound = this.props.licenseData.filter((obj) => obj.data().plate === data);

          this.setState({ searchData: dataFound });
        } else {
          toast('Please Enter a word to search', { autoClose: 5000 });
        }
      }
    };
    toggle = (evt) => {

    }

    viewProfile = (name, model, license, email) => {
      this.props.openModal();
    };
    closeModal = () => {
      this.setState({ showModal: false });
    };

    constructor(props) {
      super(props);
      this.state = {
        filtered: [],
        searchWord: '',
        search: true,
        foundUser: [],
        chat: 'none',
        display: [],
        searchData: [],
        showModal: false,
      };
    }

    componentWillMount() {
      this.props.license();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.chatId !== this.props.chatId) {
        this.props.userMessage.map((data) => {
          if (data) {
            const arrayType = Object.keys(data);
            arrayType.map((objData, index) => {
              if ((chatId === data[objData].message.sender) || (nextProps.chatId === data[objData].message.sender)) {
                addResponseMessage(data[objData].message.message);
              }
            });
          }
        });
      }

      const presentMessage = {};
      if (nextProps.userMessage !== this.props.userMessage) {
        nextProps.userMessage.map((data) => {
          if (data) {
            const arrayType = Object.keys(data);
            arrayType.map((objData, index) => {
              if (index === arrayType.length - 1) {
                if ((chatId === data[objData].message.sender) || (this.props.chatId === data[objData].message.sender)) {
                  addResponseMessage(data[objData].message.message);
                }
                if (this.state.chat != 'block') {
                  toast(data[objData].message.message, { autoClose: 4000 });
                }
              }

              if (this.props.user.email != data[objData].message.sender) { presentMessage[data[objData].message.sender] = data[objData]; }
            });
          }
        });

        this.props.displayMessages(presentMessage);
      }
    }

    componentDidMount() {
      if (this.props.user.email) {
        this.props.receiveMessage(this.props.user.email.replace(/[^\w\s]/gi, ''));
        // setTimeout( ()=> { this.receiveNotifications(this.props.user.email.replace(/[^\w\s]/gi, ''))}, 10000);
      } else {
      }
    }

    render() {
      return (
        <div className="row">
          <div className="col-md-12 center-block col-xs-*">
            <form onSubmit={this.onFormSubmit} className="sidebar-form" _lpchecked="1">
              <div className="input-group">
                <input type="text" onChange={this.searchInput} style={{ backgroundColor: 'white' }} name="q" className="form-control" placeholder="Search..." />
                <span className="input-group-btn">
                  <button type="button" name="search" onClick={this.triggerSearch} id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                  </button>
                </span>
              </div>
            </form>
            <div style={{ display: this.props.chat || this.state.chat }}>
              <Widget ref={(input) => { this.widgetInput = input; }} /> title={this.props.chatId || chatId} addUserMessage={this.addNewMessage} handleNewUserMessage={this.handleNewUserMessage} />
            </div>
          </div>
          <div>
            <ToastContainer />
          </div>

          {this.state.searchData.map((obj) => {
            const data = obj.data();
            return <ProfileCard name={data.name} img={data.file} email={data.email} model={data.model} profile={this.viewProfile} openChat={() => { this.triggerChat(data.user); }} license={data.plate} />;
          })}


          {this.props.licenseData.length ? null : <span style={{ textAlign: 'center', marginLeft: '30px' }}>Hold on while we retreive your data</span>}

        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    licenseData: state.user.licenses,
    user: state.user.userProfile,
    userMessage: state.user.messages,
    chat: state.user.chat,
    chatId: state.user.chatId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    license: () => dispatch(viewLicense()),
    sendMessage: (id, msg) => dispatch(sendMessage(id, msg)),
    receiveMessage: (id) => dispatch(receiveMessage(id)),
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
    displayMessages: (messages) => dispatch(displayMessages(messages)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBox));

