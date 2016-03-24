var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');

  var myLatLng = {lat: crd.latitude, lng: crd.longitude};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

function initMap() {
  navigator.geolocation.getCurrentPosition(success, error, options);
}