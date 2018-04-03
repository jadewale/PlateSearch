import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../../../../../component/rating';

const FindUsers = ({
  display, searchUsers, onChange, openChat,
}) => (
  <div className="box box-danger">
    <div className="box-header with-border">
      <h3 style={{ fontSize: '8px' }} className="box-title"> Search Users </h3>
      <form onSubmit={searchUsers} className="sidebar-form" _lpchecked="1">
        <div className="input-group">
          <input required type="text" style={{ backgroundColor: 'white' }} onChange={onChange} name="q" className="form-control" placeholder="Search for users..." />
          <span className="input-group-btn">
            <button type="button" name="search" id="search-btn" className="btn btn-flat card-action"><i className="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>
    </div>
    <div className="box-body ">
      { (display.model) ?
        <div className="col-md-12">
          <div className="box box-widget widget-user-2">
            <div className="widget-user-header bg-aqua-active">
              <div className="widget-user-image">
                <img
                  className="img-circle"
                  src={display.photoURL || 'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png" alt="User Avatar'}
                />
              </div>
              <h3 className="widget-user-username">{display.displayName}</h3>
              <h5 className="widget-user-desc">{display.status}</h5>
            </div>
            <div className="box-footer no-padding">
              <ul className="nav nav-stacked">
                <li><a href="#">Model <span className="pull-right ">{display.model}</span></a></li>
                <li><a href="#"> <span className="">{display.visible ? display.address : 'Private Location'}</span></a></li>
                <li><a><Rating rating={['1', '2', '3', '4', '5']} /> </a></li>
                <li><a href="#">License <span className="pull-right ">{ display.license }</span></a></li>
                <li onClick={() => { openChat(display.email); }}><a href="#">Chat <span className="pull-right "></span></a></li>
              </ul>
            </div>
          </div>
        </div> : null
      }
    </div>
    <div className="box-footer text-center">
      <a href="/" className="uppercase"></a>
    </div>
  </div>
);

FindUsers.propTypes = {
  display: PropTypes.object.isRequired,
  openChat: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
};
export default FindUsers;
