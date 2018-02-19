import React from 'react';

const Header = () => (
    <header className="main-header">
        <a href="#" className="logo">
            <span className="logo-mini"><b>A</b>LT</span>
            <span className="logo-lg"><b>Plate</b>Me</span>
        </a>
        <nav className="navbar navbar-static-top">
            <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </a>

            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    <li className="dropdown messages-menu open">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="fa fa-envelope-o"></i>
                            <span className="label label-success">4</span>
                        </a>
                    </li>

                    <li>
                        <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Header;