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

    getPOI();
}

function getPOI() {

    var poiMarkerArray = new Array();
    var poiLabelArray = new Array();

    poiMarkerArray[0] = {lat: 34.227590, lng: -118.485884}
    poiLabelArray[0] = "Food for Less";
    poiMarkerArray[1] = {lat: 34.241809, lng: -118.555396}
    poiLabelArray[1] = "Ross Dress for Less";
    poiMarkerArray[2] = {lat: 34.229354, lng: -118.561901}
    poiLabelArray[2] = "Payless";
    poiMarkerArray[3] = {lat: 34.255339, lng: -118.502719}
    poiLabelArray[3] = "Dollar Tree";
    poiMarkerArray[4] = {lat: 34.233888, lng: -118.535308}
    poiLabelArray[4] = "99 Cent Store";
    poiMarkerArray[5] = {lat: 34.192564, lng: -118.532648}
    poiLabelArray[5] = "Food for Less";

    for(var i = 0; i < 6; i++)
        addMarker(poiMarkerArray[i], poiLabelArray[i]);
}

function addMarker(poiMarker, poiLabel) {

    marker = new google.maps.Marker({
        position: poiMarker,
        map: map,
        title: poiLabel
    });
}
