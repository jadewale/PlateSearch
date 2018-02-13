import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import RightSidebar from './sidebar/rightSideBar';
import Footer from './footer';
import ProfileCard from '../user/profile/ProfileCard';
import {Route} from 'react-router-dom';
import RegisterForm from '../user/forms/Register';
import {fetchAdmin, receiveMessageSuccess} from "../../actions/userActions";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import AdminCard from '../user/profile/AdminCard';
import ChatBox from '../user/chat/ChatBox';
import firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify';


class Dashboard extends React.Component {


    constructor(props) {
        super(props);

        this.getLocation().then((res) => {
            debugger;
        });

        if(localStorage.getItem('admin')) {
            setTimeout(()=> {document.getElementById('widget').style.display = 'none';}, 3000);
            this.props.fetchAdmin();
            console.log('admin exists');
        } else{
            console.log('admin does not exists');
        }
        localStorage.clear();
    }

     getLocation = () => {
        const geolocation = navigator.geolocation;

        const location = new Promise((resolve, reject) => {
            if (!geolocation) {
                reject(new Error('Not Supported'));
            }

            geolocation.getCurrentPosition((position) => {
                resolve(position);
            }, () => {
                reject(new Error('Permission denied'));
            });
        });
        return location;
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.userData !== this.props.userData) {
            this.props.history.push('/dashboard/admin');
        }

        if(nextProps.userMessage !== this.props.userMessage) {
            nextProps.userMessage.map((data) => {
                if(data) {
                    let arrayType = Object.keys(data);
                    arrayType.map((objData) => {
                        toast(data[objData].message.message, {autoClose: 4000});
                    });
                }
            })
        }
    }

    componentDidMount(){
        if(this.props.user.email) {
             setTimeout( ()=> { this.receiveNotifications(this.props.user.email.replace(/[^\w\s]/gi, ''))}, 2000);
        } else{

        }
    }

    receiveNotifications = (id) => {
        let userChat = firebase.database().ref(`messages/${id.replace(/[^\w\s]/gi, '')}`);
        userChat.on('value', (data) => {
            this.props.messages(data.val());
        })
    };


    render () {
        return (
            <div className="skin-blue sidebar-mini wrapper">
                <Header/>
                <Sidebar photo={this.props.user.photo} />
                <ToastContainer />
               <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Welcome
                            <small> {this.props.userData.email || this.props.user.name ||  'User'}</small>
                        </h1>
                        Please Upload your License for Approval

                    </section>
                    <section className="content" style={{height: "80vh"}}>
                        <div className="box">
                            <div className="box-header with-border">
                                <h3 className="box-title">Title</h3>

                                <div className="box-tools pull-right">
                                    <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                                            title="Collapse">
                                        <i className="fa fa-minus"></i></button>
                                    <button type="button" className="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                                        <i className="fa fa-times"></i></button>
                                </div>
                            </div>
                            <div className="box-body">
                                <Route path="/dashboard/register" component={RegisterForm}/>
                                <Route path="/dashboard/search" component={ProfileCard}/>
                                <Route path="/dashboard/admin" component={AdminCard} />
                            </div>
                            <div className="box-footer">
                            </div>
                        </div>
                 </section>
                </div>
                <Footer/>
                <RightSidebar />
                <div className="control-sidebar-bg"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user.adminData ,
        user: state.user.userProfile,
        userMessage: state.user.messages,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAdmin: () => dispatch(fetchAdmin()),
        messages: (msg) => dispatch(receiveMessageSuccess(msg)),
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
