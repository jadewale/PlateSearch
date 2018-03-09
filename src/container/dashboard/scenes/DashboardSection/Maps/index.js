import React from 'react';
import { GoogleMap, Marker, withGoogleMap, TrafficLayer } from 'react-google-maps';
import PropTypes from 'prop-types';

const DashboardMap = (props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.coords.lat, lng: props.coords.lon }}
    googleMapURL="https://maps.googleapis.com/maps/api/js"
    loadingElement={<div>Loading</div>}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.coords.lat, lng: props.coords.lon }} />}
    <TrafficLayer autoUpdate />
  </GoogleMap>
);

DashboardMap.propTypes = {
  isMarkerShown: PropTypes.bool.isRequired,
  coords: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  }).isRequired,
};

export default withGoogleMap(DashboardMap);

