let map;
var directionsService;
var directionsRenderer;
var geocoder;

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
}