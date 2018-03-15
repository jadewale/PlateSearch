function geocodeLatLng(geocoder, value, props) {
  const input = value;
  const latlngStr = input.split(',', 2);
  const latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
  debugger;
  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        if (true || results[0].formatted_address.match(/(\sUK)/g)) {
          alert('You Have authorized access due to your location');
        } else {
           console.log(results[0].formatted_address);
          alert('You do not have access due to your location');
          return false;
        }
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert(`Geocoder failed due to: ${status}`);
    }
  });
}

export function getLocation() {
  const { geolocation } = window.navigator;

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition((position) => {
      resolve(position);
    }, () => {
      alert('You need to enable geolocation to use the app');
      return false;
    });
  });
  return location;
}

export function getGeo(resp) {
  const { latitude, longitude } = resp.coords.latitude;
  let geocode = {};
  if (window.google.maps) {
    geocode = new window.google.maps.Geocoder();
    return geocodeLatLng(geocode, `${latitude},${longitude}`);
  }
  return false;
}

