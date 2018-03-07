import React from 'react';
import { GoogleMap, Marker, withGoogleMap, TrafficLayer } from 'react-google-maps';
import PropTypes from 'prop-types';

const DashboardMap = (props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    googleMapURL="https://maps.googleapis.com/maps/api/js"
    loadingElement={<div>Loading</div>}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    <TrafficLayer autoUpdate />
  </GoogleMap>
);

DashboardMap.propTypes = {
  isMarkerShown: PropTypes.bool.isRequired,
};

export default withGoogleMap(DashboardMap);

