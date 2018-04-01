import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

let menuObject = [{ menu: 'Weather', children: ['weather'], id: 1 }];

const margin = {
  marginLeft: '8px',
};

function generateMenu(id) {
  menuObject = menuObject.map((data) => {
    if (data.id === id) {
      if (data.class === 'active') {
        data.class = '';
        return { ...data, class: '', toggle: 'right' };
      }
      data.class = 'active';
      return { ...data, class: 'active', toggle: 'down' };
    }
    return { ...data, class: '', toggle: 'right' };
  });
}

const SideBar = ({
  photoUrl, onChange, onSubmit, status, weather,
}) => (
  <aside className="main-sidebar">
    <section className="sidebar">
      <div className="user-panel">
        <div className="pull-left image">
          <img src={photoUrl} className="img-circle" alt="User" />
        </div>
        <div className="pull-left info">
          <p></p>
          <a href="/"><i className="fa fa-circle text-success"></i> Online</a>
          <p style={{ marginTop: '5px' }}> { status } </p>
        </div>
      </div>
      <form className="sidebar-form">
        <div className="input-group">
          <input type="text" name="q" onChange={onChange} className="form-control" placeholder="Update Status..." />
          <span className="input-group-btn">
            <button type="button" name="search" onClick={onSubmit} id="search-btn" className="btn btn-flat"><i className="fa fa-arrow-right"></i>
            </button>
          </span>
        </div>
      </form>
      <ul id="widget" className="sidebar-menu" data-widget="tree">
        <li className="header">
          <input onChange={onChange} type="checkbox" />
          <span className="col-sm-offset-1">Visible</span>
        </li>

        <li className="header">MAIN NAVIGATION</li>
        {menuObject.map(((data) => (
          <li key={data} className={`treeview ${data.class}`}>
            <a onClick={() => { generateMenu(data.id); }} href="#">
              <i className={`fa ${(weather.main === 'Clouds') ? 'fa-cloud' : 'fa-sun-o'}`}></i>
              <span style={margin}>{
                data.menu
              }
              </span>
              <span style={margin}>
                {weather.icon && weather.icon.replace('d', '')}
                &deg;
              </span>
              <span className="pull-right-container">
                <i className={`fa fa-angle-${data.toggle || 'right'} pull-right`}></i>
              </span>
            </a>
            <ul className="treeview-menu">
              {data.children.map(() => (
                <li className="">
                  <a className="">{`Type: ${weather.main || ''}`}</a>
                  <a className="">{`Description:  ${weather.description || ''}`}</a>
                  <a className="">{`Temperature:  ${weather.icon && weather.icon.replace('d', '')}`}&deg;</a>
                </li>
              ))}
            </ul>
          </li>
        )))}
      </ul>
    </section>
  </aside>
);

SideBar.propTypes = {
  photoUrl: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  status: PropTypes.string,
  weather: PropTypes.object,
};

SideBar.defaultProps = {
  photoUrl: 'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png',
  status: '',
  weather: {},
};

export default SideBar;
