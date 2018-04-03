import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ toggle, prompt }) => (
  <header className="main-header">
    <a href="#" className="logo">
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
          <li className="dropdown messages-menu fifth-step">
            <a href="#" onClick={prompt} className="dropdown-toggle" data-toggle="tooltip" data-placement="left" title="Logout" aria-expanded="false">
              <i className="fa fa-sign-out"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

Header.propTypes = {
  prompt: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Header;
