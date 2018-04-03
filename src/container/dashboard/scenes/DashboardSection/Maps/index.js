import React from 'react';
import { GoogleMap, Marker, withGoogleMap, TrafficLayer, withScriptjs, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';

const DashboardMap = ({
  userlocation, allUsers, isMarkerShown, onToggleInfoDisplay,
}) => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: userlocation.lat, lng: userlocation.lng }}
  >
    {isMarkerShown && Object.keys(allUsers).map((data) => allUsers[data].latitude && allUsers[data].visible &&
      <Marker
        icon={require('../../../../../asset/img/car4.png')}
        key={data}
        position={{ lat: allUsers[data].latitude || 0, lng: allUsers[data].longitude || 0 }}
        onClick={() => onToggleInfoDisplay(data, true)}
      >
        {allUsers[data].map && <InfoWindow onCloseClick={() => onToggleInfoDisplay(data, false)}>
          <div>
            <p>{allUsers[data].displayName}</p>
            <h6>{allUsers[data].address}</h6>
            <h6>{allUsers[data].license}</h6>
          </div>
        </InfoWindow>
        }
      </Marker>
    )
    }
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
  onToggleInfoDisplay: PropTypes.func.isRequired,
};

export default withScriptjs(withGoogleMap(DashboardMap));

