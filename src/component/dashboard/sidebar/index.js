import React from 'react';
import {Link} from 'react-router-dom';


let menuObject = [{menu: 'Dashboard', children: ['register', 'search'], id: 1}];

function generateMenu(id) {
    menuObject = menuObject.map((data) => {
        if(data.id === id) {
            data.class = 'active';
            return {...data, class: 'active', toggle: 'down'}
        }
        else
            return {...data, class: '', toggle: 'right'}

    });

}

const SideBar = () => (
    <aside className="main-sidebar">
        <section className="sidebar">
            <div className="user-panel">
                <div className="pull-left image">

                </div>
                <div className="pull-left info">
                    <p></p>
                    <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>
            <form action="#" method="get" className="sidebar-form">
                <div className="input-group">
                    <input type="text" name="q" className="form-control" placeholder="Search..."/>
                    <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                </button>
              </span>
                </div>
            </form>
            <ul id="widget"  className="sidebar-menu" data-widget="tree">
                <li className="header">MAIN NAVIGATION</li>
                {menuObject.map((data => (
                    <li className={`treeview ${data.class}`}>
                        <a onClick={() => {generateMenu(data.id)}} href="#">
                            <i className="fa fa-dashboard"></i>
                            <span>{
                                data.menu
                            }
                            </span>
                            <span className="pull-right-container">
                                <i className={`fa fa-angle-${data.toggle || 'right'} pull-right`}></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                        {data.children.map((obj) =>(
                            <li>
                                <Link to={`/dashboard/${obj}`}><i className="fa fa-circle-o"></i>{obj} </Link>
                            </li>
                        ))}
                        </ul>
                    </li>
                )))}
            </ul>
        </section>
    </aside>
);

export default SideBar;