let map;
var directionsService;
var directionsRenderer;
var geocoder;
var currentPosLat;
var currentPosLon;
var gotCurrentLoc;

function initMap() {
    geocoder = new google.maps.Geocoder();
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
    
    directionsRenderer.setMap(map);
}

async function getCurrentPosition() {
/*****************************************************************************/
    //code used for panning to the current location on the map
    infoWindow = new google.maps.InfoWindow();
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          currentPosLat = position.coords.latitude;
          currentPosLon = position.coords.longitude;
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );      
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    return;
/*****************************************************************************/
};

async function useCurPosAsOrigin() {
    await getCurrentPosition();
    var tempText = currentPosLat + "," + currentPosLon;
    var tempSomething = document.getElementById("origin");
    tempSomething.value = tempText;
    //alert("button clicked");
};

function calcRoute(event) {
    event.preventDefault();
    var origin = document.getElementById('origin').value;
    var destination = document.getElementById('destination').value;
    var departTime = document.getElementById('start-time').value;
    if (departTime) {
        departTime = new Date(departTime);
    } else {
        departTime = new Date();
    }
    var request = {
        origin: origin,
        destination: destination,
        drivingOptions: {
            departureTime: departTime,
        },
        travelMode: 'DRIVING',
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
}


window.onload = () => {
    document.getElementById('travel-form').addEventListener('submit', calcRoute);
    document.getElementById('currentPositionBtn').addEventListener('click', getCurrentPosition);
    document.getElementById('currentOriginBtn').addEventListener('click', useCurPosAsOrigin);
}