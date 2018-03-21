import React from 'react';
import PropTypes from 'prop-types';
import Maps from './Maps';
import RecommendedUsers from './RecommendedUsers';
import FindUsers from './FindUsers';

const DashboardSection = ({
  admin, coords, users, openChat, onChange, searchUsers,
}) => (
  <section className="content" style={{ height: '80vh' }}>
    <div className="box">
      <div className="box-header with-border">
        <h3 className="box-title">Title</h3>

        <div className="box-tools pull-right">
          <button
            type="button"
            className="btn btn-box-tool"
            data-widget="collapse"
            data-toggle="tooltip"
            title="Collapse"
          >
            <i className="fa fa-minus"></i>
          </button>
          <button type="button" className="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      <div className="box-body">
        <div className="row">
          <div className="col-md-8">
            <Maps
              coords={coords}
              userlocation={{
                lat: coords.latitude,
                lng: coords.longitude,
              }}
              allUsers={users}
              containerElement={<div style={{ height: '400px' }} />}
              mapElement={<div style={{ height: '100%' }} />}
              isMarkerShown
            />
          </div>
          <div className="col-md-4">
            <RecommendedUsers admin={admin} openChat={openChat} users={users} />
            <FindUsers searchUsers={searchUsers} onChange={onChange}/>
          </div>
          <div className="col-md-6">
          </div>
        </div>
      </div>
      <div className="box-footer">
      </div>
    </div>
  </section>
);

DashboardSection.propTypes = {
  coords: PropTypes.object.isRequired,
  openChat: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  users: PropTypes.object,
};

DashboardSection.defaultProps = {
  users: {},
};

export default DashboardSection;
