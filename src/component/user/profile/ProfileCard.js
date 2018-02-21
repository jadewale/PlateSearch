
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {viewLicense, sendMessage, receiveMessage, openModal, closeModal} from "../../../actions/userActions";
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import firebase from 'firebase';
let chatId = '';



const ProfileCard = ({name, model, license, email, openChat, profile}) => (
    <div style={{marginTop: '20px'}} className="col-md-4">
        <div className="box-body box-profile">
            <img className="profile-user-img img-responsive img-circle" src="http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png" alt="User profile picture"/>

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
            <button onClick={() => {profile(name, model, license, email)}} className="btn btn-primary btn-block"><b>View Profile</b></button>
        </div>
    </div>
);

class  SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            filtered: [],
            searchWord: '',
            search: true,
            foundUser: [],
            chat: 'none',
            display: [],
            searchData: [],
            showModal: false,
        }
    }


    componentWillMount () {
        this.props.license();

    };

    componentWillReceiveProps(nextProps) {
      if(nextProps.userMessage !== this.props.userMessage) {
        nextProps.userMessage.map((data) => {
          if(data) {
            let arrayType = Object.keys(data);
            arrayType.map((objData, index) => {
                if( index === arrayType.length - 1) {
                    if(chatId === data[objData].message.sender ) {
                      addResponseMessage(data[objData].message.message);
                    }
                  console.log(data[objData].message.message, 'last message', data[objData].message.sender);
                }
              toast(data[objData].message.message, {autoClose: 4000});

            });
          }
        })

      }
    }

    componentDidMount() {

        if(this.props.user.email) {

          this.props.receiveMessage(this.props.user.email.replace(/[^\w\s]/gi, ''));
           // setTimeout( ()=> { this.receiveNotifications(this.props.user.email.replace(/[^\w\s]/gi, ''))}, 10000);
        } else{

        }
    };




    searchInput = (evt) => {
       /* if (!evt.target.value) {
            // this.props.licenseData
            this.setState({search: false, foundUser: [], display: []});
        }
        else{
            this.setState({search: true});
            let dataFound = this.props.licenseData.filter((obj) => {
                return obj.data().plate == evt.target.value
            });

            this.setState({foundUser: dataFound, display: []});
        } */

       this.setState({searchWord: evt.target.value});
    };


    triggerChat = (user) => {
        console.log('User', user);
        chatId = user;
        this.setState({chat: 'block'});
    };

    handleNewUserMessage = (newMessage) => {
        this.props.sendMessage(chatId, { message: newMessage, user: chatId, sender: this.props.user.email });
    };

    addNewMessage= (message) => {
        console.log('hello', message);
        this.handleNewUserMessage('Hi');
    };

    notify = () => {
        toast("Wow so easy !", { autoClose: 5000 });
    };

    onFormSubmit = (evt) => {
      evt.preventDefault();
      this.triggerSearch(); // searchWord
    };

    triggerSearch = () => {

        console.log(this.props.user);
        if(this.props.user.verified !== true) {
            if(this.props.user.verified === 'deactivated') {

                toast("Your account has been deactivated", {autoClose: 5000});
            } else {
                toast("Your account has not been verified", {autoClose: 5000});
            }
        } else {


            let data = this.state.searchWord;
            if (data) {
                let dataFound = this.props.licenseData.filter((obj) => {
                    return obj.data().plate === data
                });

                this.setState({searchData: dataFound});
            } else {
                toast("Please Enter a word to search", {autoClose: 5000});
            }
        }
    };

    viewProfile = (name, model, license, email) => {
        this.props.openModal();
    };

    closeModal = () => {
        this.setState({showModal: false});
    };

    render () {
        return (
            <div className="row">
                <div className="col-md-12 center-block col-xs-*">
                    <form onSubmit={this.onFormSubmit} class="sidebar-form" _lpchecked="1">
                        <div class="input-group">
                            <input type="text" onChange={this.searchInput} style={{backgroundColor: 'white'}} name="q" class="form-control" placeholder="Search..."/>
                            <span class="input-group-btn">
                                <button type="button" name="search" onClick={this.triggerSearch} id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                    <div style={{display: this.state.chat}}>
                        <Widget addUserMessage={this.addNewMessage} handleNewUserMessage={this.handleNewUserMessage} />
                    </div>
                </div>
                <div>
                    <ToastContainer />
                </div>

                {this.state.searchData.map((obj) => {
                     const data = obj.data();
                     return <ProfileCard name={data.name} img={data.file} email={data.email} model={data.model} profile={this.viewProfile} openChat={ () => {this.triggerChat(data.user)}} license={data.plate}/>
                })}


                {this.props.licenseData.length ? null : <span style={{textAlign: 'center', 'marginLeft': '30px'}}>Hold on while we retreive your data</span>}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        licenseData: state.user.licenses,
        user: state.user.userProfile,
        userMessage: state.user.messages,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        license: () => dispatch(viewLicense()),
        sendMessage: (id, msg) => dispatch(sendMessage(id, msg)),
        receiveMessage: (id) =>  dispatch(receiveMessage(id)),
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBox))

