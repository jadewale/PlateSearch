import React from 'react';

const RecomendedUser = () => (
  <div className="box box-danger">
    <div className="box-header with-border">
      <h3 style={{ fontSize: '8px' }} className="box-title">Recommended Members</h3>

      <div className="box-tools pull-right">
        <span className="label label-danger">8 New Members</span>
        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
        </button>
        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i>
        </button>
      </div>
    </div>
    <div className="box-body no-padding">
      <ul className="users-list clearfix">
        <li>
          <img className="img-circle" src="http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png" alt="User" />
          <a className="users-list-name" href="/dashboard">Nadia</a>
          <span className="users-list-date">15 Jan</span>
        </li>
      </ul>
    </div>
    <div className="box-footer text-center">
      <a href="/" className="uppercase">View All Users</a>
    </div>
  </div>
);

export default RecomendedUser;
