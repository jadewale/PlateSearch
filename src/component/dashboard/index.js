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
let google = {};


function geocodeLatLng(geocoder, value, props) {

  var input = value;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function (results, status) {
    if (status === 'OK') {
      if (results[0]) {
        if(true || results[0].formatted_address.match(/(\sUK)/g)) {
            alert('You Have authorized access due to your location');
            return;
        } else{
          console.log(results[0].formatted_address);
            alert('You do not have access due to your location');
            props.history.push('/login');
            return false;
        }
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

const Comp = () => (
  <div>
    <span>Welcome To PlateMe, You have successfully Registered your data</span>
  </div>
)

class Dashboard extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
          verified: false,
        };

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
              alert('You need to enable geolocation to use the app');
              this.props.history.push('/login');
                // reject(new Error('Permission denied'));
            });
        });
        return location;
    };

   pushToRouter =() => {
       this.props.history.push('/dashboard/Search');
   }


    componentWillReceiveProps(nextProps) {
        if(nextProps.userData !== this.props.userData) {
            this.props.history.push('/dashboard/admin');
        }else {
          if(nextProps.user.verified == true ) {
            setTimeout(()=> this.pushToRouter(), 2000)

          }else {
            
            this.setState({verified : true});
          }
        }
    }

    getGeo = (coors) => {
        let latitude = coors.coords.latitude;
        let longitude = coors.coords.longitude;

        let geocode = {};
        if(window.google.maps) {
          google = window.google;
          geocode = new google.maps.Geocoder;
          geocodeLatLng(geocode, `${latitude},${longitude}`, this.props);
        } else{
            this.props.history.push('/login');
        }

    }

    componentDidMount(){
        if(this.props.user.email) {
             // setTimeout( ()=> { this.receiveNotifications(this.props.user.email.replace(/[^\w\s]/gi, ''))}, 2000);
        } else{

        }
      this.getLocation().then((res) => {
            if(google) {
              setTimeout(() => { this.getGeo(res)}, 0);
            }
      });
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
                            
                                <Route path="/dashboard/Register" component={RegisterForm}/>
                              <Route path="/dashboard/Registerd" component={Comp}/>
                              
                                <Route path="/dashboard/Search" component={ProfileCard}/>
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
