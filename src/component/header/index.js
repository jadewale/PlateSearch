import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ toggle }) => (
  <header className="main-header">
    <a href="/dashboard" className="logo">
      <span className="logo-mini"><b>P</b>M</span>
      <span className="logo-lg"><b>Plate</b>Me</span>
    </a>
    <nav className="navbar navbar-static-top">
      <button onClick={toggle} className="sidebar-toggle" data-toggle="push-menu">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>

      <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
        </ul>
      </div>
    </nav>
  </header>
);

Header.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Header;
