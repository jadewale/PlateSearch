import React from 'react';
import { GoogleMap, Marker, withGoogleMap, TrafficLayer } from 'react-google-maps';
import PropTypes from 'prop-types';

const DashboardMap = ({ userlocation, allUsers, isMarkerShown }) => (
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: userlocation.lat, lng: userlocation.lng }}
    googleMapURL="https://maps.googleapis.com/maps/api/js"
    loadingElement={<div>Loading</div>}
  >
    {isMarkerShown && Object.keys(allUsers).map((data) => allUsers[data].latitude && allUsers[data].visible &&
      <Marker key={data} position={{ lat: allUsers[data].latitude || 0, lng: allUsers[data].longitude || 0 }} />)}
    <TrafficLayer autoUpdate />
  </GoogleMap>
);
DashboardMap.propTypes = {
  isMarkerShown: PropTypes.bool.isRequired,
  userlocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  allUsers: PropTypes.object.isRequired,
};

export default withGoogleMap(DashboardMap);

