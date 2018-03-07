import React from 'react';
import PropTypes from 'prop-types';

const SideBar = ({ photoUrl }) => (
  <aside className="main-sidebar">
    <section className="sidebar">
      <div className="user-panel">
        <div className="pull-left image">
          <img src={photoUrl} className="img-circle" alt="User" />
        </div>
        <div className="pull-left info">
          <p></p>
          <a href="/"><i className="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <form className="sidebar-form">
        <div className="input-group">
          <input type="text" name="q" className="form-control" placeholder="Update Status..." />
          <span className="input-group-btn">
            <button type="button" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-arrow-right"></i>
            </button>
          </span>
        </div>
      </form>
      <ul id="widget" className="sidebar-menu" data-widget="tree">
        <li className="header">MAIN NAVIGATION</li>
      </ul>
    </section>
  </aside>
);

SideBar.propTypes = {
  photoUrl: PropTypes.string,
};

SideBar.defaultProps = {
  photoUrl: 'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png',
};

export default SideBar;
