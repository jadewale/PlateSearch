import React from 'react';
import PropTypes from 'prop-types';
import ProfileCard from '../../../../../component/profileCard';

const FindUsers = ({ display, searchUsers, onChange }) => (
  <div className="box box-danger">
    <div className="box-header with-border">
      <h3 style={{ fontSize: '8px' }} className="box-title"> Search Users </h3>
      <form onSubmit={searchUsers} className="sidebar-form" _lpchecked="1">
        <div className="input-group">
          <input required type="text" style={{ backgroundColor: 'white' }} onChange={onChange} name="q" className="form-control" placeholder="Search for users..." />
          <span className="input-group-btn">
            <button type="button" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>
    </div>
    <div className="box-body ">
      <div className="col-md-12">
        <div className="box box-widget widget-user-2">
          <div className="widget-user-header bg-aqua-active">
            <div className="widget-user-image">
              <img className="img-circle" src="http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png" alt="User Avatar" />
            </div>
            <h3 className="widget-user-username">Nadia Carmichael</h3>
            <h5 className="widget-user-desc">Lead Developer</h5>
          </div>
          <div className="box-footer no-padding">
            <ul className="nav nav-stacked">
              <li><a href="#">Projects <span className="pull-right badge bg-blue">31</span></a></li>
              <li><a href="#">Tasks <span className="pull-right badge bg-aqua">5</span></a></li>
              <li><a href="#">Completed Projects <span className="pull-right badge bg-green">12</span></a></li>
              <li><a href="#">Followers <span className="pull-right badge bg-red">842</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="box-footer text-center">
      <a href="/" className="uppercase"></a>
    </div>
  </div>
);

FindUsers.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
};
export default FindUsers;
