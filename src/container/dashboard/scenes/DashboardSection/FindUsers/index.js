import React from 'react';
import PropTypes from 'prop-types';

const FindUsers = ({ searchUsers, onChange }) => (
  <div className="box box-danger">
    <div className="box-header with-border">
      <h3 style={{ fontSize: '8px' }} className="box-title"> Search Users </h3>
      <form onSubmit={searchUsers} className="sidebar-form" _lpchecked="1">
        <div className="input-group">
          <input type="text" style={{ backgroundColor: 'white' }} onChange={onChange} name="q" className="form-control" placeholder="Search for users..." />
          <span className="input-group-btn">
            <button type="button"  name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>
    </div>
    <div className="box-body no-padding">
      <ul className="users-list clearfix">

      </ul>
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
