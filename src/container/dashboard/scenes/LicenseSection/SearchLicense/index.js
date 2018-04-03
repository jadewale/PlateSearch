import React from 'react';

const Profile = () => (
  <div style={{ marginTop: '20px' }} className="col-md-12">
    <div className="box-body box-profile">
      <img
        className="profile-user-img img-responsive img-circle"
        src="http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png"
        alt="User profile picture"
      />

      <h3 className="profile-username text-center">Jola</h3>

      <p className="text-muted text-center">jbadewale</p>

      <ul className="list-group list-group-unbordered">
        <li className="list-group-item">
          <b>Name</b> <a className="pull-right">test</a>
        </li>
        <li className="list-group-item">
          <b>Model</b> <a className="pull-right">car</a>
        </li>
        <li className="list-group-item">
          <b>License</b> <a className="pull-right">1234</a>
        </li>
      </ul>
      <button className="btn btn-primary btn-block"><b>View Profile</b></button>
    </div>
  </div>
);

const SearchLicense = () => (
  <div className="row">
    <div className="col-md-12 center-block col-xs-*">
      <form onSubmit={() => {}} className="sidebar-form" _lpchecked="1">
        <div className="input-group">
          <input type="text" onChange={() => {}} style={{ backgroundColor: 'white' }} name="q" className="form-control" placeholder="Search..." />
          <span className="input-group-btn">
            <button type="button" name="search" onClick={() => {}} id="search-btn" className="btn btn-flat card-tasks"><i className="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>
    </div>
    <div className="col-md-12">
      <Profile/>
    </div>
  </div>
);

export default SearchLicense;
