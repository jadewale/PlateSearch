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
        <h3 className="widget-user-username">Alexander Pierce</h3>
        <h5 className="widget-user-desc">Founder &amp; CEO</h5>
      </div>
      <div className="widget-user-image">
        <img className="img-circle" src="../dist/img/user1-128x128.jpg" alt="User Avatar" />
      </div>
      <div className="box-footer">
        <div className="row">
          <div className="col-sm-4 border-right">
            <div className="description-block">
              <h5 className="description-header">3,200</h5>
              <span className="description-text">SALES</span>
            </div>
          </div>
          <div className="col-sm-4 border-right">
            <div className="description-block">
              <h5 className="description-header">13,000</h5>
              <span className="description-text">FOLLOWERS</span>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="description-block">
              <h5 className="description-header">35</h5>
              <span className="description-text">PRODUCTS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileCard;
