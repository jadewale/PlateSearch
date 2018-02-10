
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {viewLicense} from "../../../actions/userActions";
import { Widget } from 'react-chat-widget';
import {approveUser, deactivateAccount} from "../../../actions/userActions";


const ProfileCard = ({name, model, license, email, openChat, img, approve, sendConfirm, user, deactivate, deactivated}) => (
    <div className="col-md-4">
        <div className="box-body box-profile">
            <img className="profile-user-img img-responsive img-circle" src={ img || 'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png'} alt="User profile picture"/>

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
             { approve ? <button onClick={ () => {sendConfirm(user)}} className="btn btn-primary btn-block"><b>Approve</b></button> :
                <button onClick={openChat} className="btn btn-primary btn-block"><b> {deactivated ? 'Please Activate Account' : 'Chat'}</b></button>
            }

            {deactivated ? <button onClick={() => {deactivate(user)}} className="btn btn-primary btn-block disabled"><b>Activate Account</b></button> :
                <button onClick={() => {deactivate(user)}} className="btn btn-primary btn-block"><b>Deactivate Account</b></button> }

        </div>

    </div>
);

const Preloader = () => (
    <div className="col-sm-12">
    <div style={{width:"100px", margin:"auto", display: "block"}}>
        <div className="loader text-center"></div>
    </div>

    </div>
);
    

class  SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            filtered: [],
            search: false,
            foundUser: [],
            chat: 'none',
            display: [],
            unverifiedUsers: [],
            verifiedUsers: [],
            user:[],
            deactivated: [],
            searchInput: '',
            preloader: false,
        }
    }


    componentWillMount () {
        this.props.license();
    };

    componentWillReceiveProps(nextProps) {
        let foundData = [];
        let userData  = [];
        let deactivatedAccount = [];
        if(nextProps.licenseData !== this.props.licenseData) {
            let data =  Object.keys(this.props.userData);
            let deactivatedKeys = Object.keys(this.props.deactivatedAccounts);
            this.setState({preloader: true});
            nextProps.licenseData.forEach((snapShot) => {
                if(data.includes(snapShot.data().user)) {
                    userData.push(snapShot.data().user);
                    foundData.push({...snapShot.data(), file: this.props.userData[snapShot.data().user].file});
                }

                if(deactivatedKeys.includes(snapShot.data().user)) {
                    deactivatedAccount.push(snapShot.data().user);
                }
            });

           this.setState({unverifiedUsers: foundData, user: userData, deactivated: deactivatedAccount, preloader: false});
        }
    }

    componentDidMount() {


    };

    sendConfirm =(user) => {
        let id= this.props.userData[user].id;
        this.props.approveUser(id);
    };

    searchInput = (evt) => {
        if(!evt.target.value) {
            this.setState({search: false});
        }
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
        this.setState({searchInput: evt.target.value});
        this.setState({preloader: true});
    };

    search = () => {
        let data = this.state.searchInput;
        console.log('Data Searched is ', data);
    };

    triggerChat = (user) => {
        this.setState({chat: 'block'});
    };

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incomig! ${newMessage}`);
        // Now send the message throught the backend API
    };

    deactivate = (user) => {
        let id= this.props.userData[user].id;
        this.props.deactivate(id);
    };

    render () {
        return (
            <div className="col-sm-12">
                <div className="col-md-12 center-block col-xs-*"  style={{marginBottom: "20px"}}>
                    <form action="#" method="get" class="sidebar-form" _lpchecked="1">
                        <div style={{display: 'none'}} class="input-group">
                            <input type="text" style={{backgroundColor: 'white'}} onChange={this.searchInput} name="q" class="form-control" placeholder="Search for users..."/>
                            <span class="input-group-btn">
                                <button type="button" onClick={this.search} name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                    <div style={{display: this.state.chat}}>
                        <Widget handleNewUserMessage={this.handleNewUserMessage} />
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div>
                        <hr/>

                    </div>

                <div>
                    <hr style={{marginBottom: "40px"}}/>

                    <h3 className="text-center">Users</h3>
                    <hr/>
                    {!this.state.search && this.state.unverifiedUsers.map((data) => {
                        return <ProfileCard approve={true} user={data.user} sendConfirm={this.sendConfirm}
                                            name={data.name} img={data.file} email={data.email}
                                            model={data.model} openChat={this.triggerChat}
                                            license={data.plate}
                                            deactivate={this.deactivate}

                        />
                    })
                    }
                    {!this.state.search && this.props.licenseData.map((obj) => {
                    const data = obj.data();

                    if(this.state.user.includes(data.user))
                        return null;
                    if(this.state.deactivated.includes(data.user))
                         return <ProfileCard name={data.name} img={data.file} email={data.email} model={data.model} openChat={() => {}} deactivated={true} license={data.plate}/>
                    return <ProfileCard name={data.name} img={data.file} email={data.email} model={data.model} openChat={this.triggerChat} license={data.plate}/>
                })}
                </div>



                <div>

                {!this.state.search && this.state.display.map((obj) => {
                    const data = obj.data();
                    return <ProfileCard name={data.name} email={data.email} model={data.model} openChat={this.triggerChat} license={data.plate}/>
                })}


                {this.props.licenseData.map((obj) => {
                    const data = obj.data();
                    return <ProfileCard name={data.name} email={data.email} model={data.model} openChat={this.triggerChat} license={data.plate}/>
                })}

                {/* {this.props.licenseData.length ? null : <span style={{textAlign: 'center', 'marginLeft': '30px'}}>Hold on while we retreive your data</span>} */}

                {this.props.licenseData.length || !this.state.preloader  ? null : <Preloader/>}

            </div>
         </div>
        </div>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        licenseData: state.user.licenses,
        userData: state.user.adminData ,
        deactivatedAccounts: state.user.deactivatedAcc
    }
}

function mapDispatchToProps(dispatch) {
    return {
        license: () => dispatch(viewLicense()),
        approveUser: (id) => dispatch(approveUser(id)),
        deactivate: (id) => dispatch(deactivateAccount(id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBox))