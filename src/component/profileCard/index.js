import React from 'react';
import PropTypes from 'prop-types';

const ProfileCard = ({ data }) => (
  <div
    style={{
      position: 'fixed',
      top: '8px',
      right: '16px',
      zIndex: 10000,
      width: '300px',
    }}
  >
    <div className="box box-widget widget-user">
      <div className="widget-user-header bg-aqua-active">
        <h3 className="widget-user-username">{ data.displayName || data.email }</h3>
        <h5 className="widget-user-desc">{ data.status || 'No Status' }</h5>
        <div className="box-tools pull-right">
          <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      <div className="widget-user-image">
        <img
          className="img-circle"
          src={data.photoURL ||
        'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png'}
          alt="User Avatar"
        />
      </div>
      <div className="box-footer">
        <div className="row">
          <div className="col-sm-4 border-right">
            <div className="description-block">
              <a href="#" className="link-black text-sm">
                <i className="fa fa-thumbs-o-up margin-r-5"></i>
                Approve
              </a>
            </div>
          </div>
          <div className="col-sm-4 border-right">
            <div className="description-block">
              <h5 className="description-header">Status</h5>
              <span className="description-text">
                { (data.verified) ? 'Verified' : 'Not Verified' }
              </span>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="description-block">
              <a href="#" className="link-black text-sm">
                <i className="fa fa-thumbs-o-down margin-r-5"></i>
                Reject
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileCard;
