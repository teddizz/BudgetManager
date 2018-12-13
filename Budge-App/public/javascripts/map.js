var counter = 0;
var map, location;
var clickedLocation;
var mapCenter = {lat: 34.2408, lng: -118.5276}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 10,
        zoomControl: false,  
    });
}        
