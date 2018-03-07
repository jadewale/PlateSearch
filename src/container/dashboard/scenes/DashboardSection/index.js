import React from 'react';
import OpenWeatherMap from 'react-open-weather-map';
import Maps from '../Maps';
import RecommendedUsers from '../RecommendedUsers';

const config = { containerClassName: 'open-weather-map-container-class-name' };

const DashboardSection = () => (
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
              containerElement={<div style={{ height: '400px' }} />}
              mapElement={<div style={{ height: '100%' }} />}
              isMarkerShown
            />
          </div>
          <div className="col-md-4">
            <RecommendedUsers />
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

export default DashboardSection;
