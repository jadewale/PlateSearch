import React from 'react';
import {connect} from 'react-redux';
import {openChat} from '../../../actions/userActions'

const NewMessage = ({name, message, data, onClick}) => {
  return (
    <li>
        <a onClick={ ()=> {onClick(data)}} href="#">
          <div  className="pull-left">
            <img src="https://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png" class="img-circle" alt="User Image"/>
          </div>
          <h4>
            {name}
            <small><i className="fa fa-clock-o"></i> Unavailable</small>
          </h4>
          <p>{message}</p>
        </a>
    </li>
  )
}

class Header extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages !== this.props.messages) {
    }
  }

  openChatUser = (data) => {
    this.props.open('block', data);
  };

  render() {
    return(
      <header className="main-header">
        <a href="#" className="logo">
          <span className="logo-mini"><b>A</b>LT</span>
          <span className="logo-lg"><b>Plate</b>Me</span>
        </a>
        <nav className="navbar navbar-static-top">
          <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </a>

          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown messages-menu open">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-envelope-o"></i>
                  <span className="label label-success">{Object.keys(this.props.messages).length}</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="header">{Object.keys(this.props.messages).length}</li>
                  <li>
                    <ul className="menu">
                      {Object.keys(this.props.messages).map((data) => (<NewMessage
                        name={this.props.messages[data].message.sender}
                        message={this.props.messages[data].message.message}
                        data={data}
                        onClick={this.openChatUser}
                      />))}
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

}

function mapStateToProps (state) {
  return {
    messages: state.user.messageDisplay,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    open: (show, user) => dispatch(openChat(show, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);