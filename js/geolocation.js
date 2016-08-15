// GEOLOCATION API
var x = document.getElementById('currentPosition');
var pos;
var mapObj;
var brunchMarkerObjs;
var markerArr_NE = [];
var markerArr_SE = [];
var markerArr_SW = [];
var markerArr_NW = [];
var selectedTime;
var infoWindow;
var mapOptions = {
    cityCenter: {
        coords: {lat: 45.523832, lng: -122.676678},
        zoom: 13
    },
    NE: {
        coords: {lat: 45.542097, lng: -122.650560},
        zoom: 14
    },
    SE: {
        coords: {lat: 45.512792, lng: -122.651998},
        zoom: 14
    },
    SW: {
        coords: {lat: 45.518964, lng: -122.679481},
        zoom: 15
    },
    NW : {
        coords: {lat: 45.529873, lng: -122.694569},
        zoom: 14
    }
};

var log = function(t){
    console.log(t);
};

// var coordsArrs = [[mapOptions.NE.coords.lat, mapOptions.NE.coords.lng], [mapOptions.SE.coords.lat, mapOptions.SE.coords.lng], [mapOptions.SW.coords.lat, mapOptions.SW.coords.lng], [mapOptions.NW.coords.lat, mapOptions.NW.coords.lng]];

// Event listener for form elements
window.addEventListener('load', function(){
    var formEl_nhood = document.forms.nhoodselect;
    document.getElementById('entryform').addEventListener('change', function(e){

        // when checkboxes are changed,
        // show/hide corresponding markers
        if(e.target.tagName === 'INPUT'){
            var val = e.target.value;
            var selectedCoords = [];
            var newCoords;
            var newZoom;
            var selectedQuads = [];

            visByCheckbox();

        // when select is changed
        // only show markers with opentime less than or equal to select value
        } else if(e.target.tagName === 'SELECT'){
            selectedTime = parseInt(e.target.value.replace(':', ''));
            visByCheckbox();
        }

        // log(selectedCoords);
        // get furthest ENSW in selectedCoords
        // if(selectedCoords.length > 1){
            // log("selectedQuads: " + selectedQuads);
            // var boundsObj = findBounds(selectedQuads);
            // var bounds = new google.maps.LatLngBounds();
            // bounds.extend(bounds);
            // mapObj.fitBounds(boundsObj);
            // log(boundsObj);
            // mapObj.fitBounds(google.maps.LatLngBoundsLiteral = boundsObj);
            // mapObj.fitBounds(google.maps.LatLngBoundsLiteral = {east: -122.51842, north: 45.5, south: 45.25, west: -122.52});
        // } else {
        //
        // }

        // if(selectedCoords.length > 1){
        //     newCoords = getMultiCenter(selectedCoords);
        // } else if(selectedCoords.length === 1){
        //     switch(val){
        //         case 'NEPDX':
        //             newCoords = mapOptions.NE.coords;
        //             newZoom = mapOptions.NE.zoom;
        //         break;
        //
        //         case 'SEPDX':
        //             newCoords = mapOptions.SE.coords;
        //             newZoom = mapOptions.SE.zoom;
        //         break;
        //
        //         case 'DTPDX':
        //             newCoords = mapOptions.SW.coords;
        //             newZoom = mapOptions.SW.zoom;
        //         break;
        //     }
        // } else {
        //     newCoords = mapOptions.cityCenter.coords;
        //     newZoom = mapOptions.cityCenter.zoom;
        // }
        // log(newCoords);
        //
        // mapObj.panTo(newCoords);
        // mapObj.setZoom(newZoom);
    });
});

function visByCheckbox(){
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    for(var i=0; i<checkboxes.length; i++){
        var quad = checkboxes[i].dataset.quad;

        // show/hide markers based on checked boxes
        if(checkboxes[i].checked){
            setMapOnAll('show', getMarkerObjs(quad));
        } else {
            setMapOnAll('hide', getMarkerObjs(quad));
        }
    }
}

// find center if multiple quads checked
// prepare for all relevant markers to be placed
function getMultiCenter(coordsArr){
    var x, y;
    // If two sets of coords, subtract one from the other in each lat lng
    if(coordsArr.length == 2){
        x = (coordsArr[0][0] + coordsArr[1][0]) / 2;
        y = (coordsArr[0][1] + coordsArr[0][1]) / 2;
    } else {
        // log("coordsArr length: " + coordsArr.length);
    }
    return {lat: x, lng: y};
    // If three or more coords, create shape and find center of shape
}

var timerStart, timerEnd;
function timer(mode){
    if(mode === 'start' || mode === 'stop'){
        var now = Date.now();
        if(mode === 'start'){
            timerStart = now;
        } else {
            timerEnd = now;
        }
    } else {
        return (timerEnd - timerStart) / 1000 + "s";
    }
}

function initMap() {
    infoWindow = new google.maps.InfoWindow({map: mapObj});
    mapObj = new google.maps.Map(document.getElementById('map'), {
        center: mapOptions.cityCenter.coords,//initializes at city center
        zoom: mapOptions.cityCenter.zoom
    });

    // convert all brunchtrackers to marker objects
    brunchMarkerObjs = convertAllToMarkers();

    // get checkboxes, prepare for geolocating user
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    var userQuad = "";

    // USER OPTS IN TO GEOLOCATION -------------------------------------
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){

timer('start');

        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // log("Current Lat, Lng: " + pos.lat + ", " + pos.lng);
        infoWindow.setPosition(pos);//center view on user location
        infoWindow.setContent('Location found.');
        mapObj.setCenter(pos);
        // infoWindow.open(mapObj);//shows location. Not necessarily accurate

        // get current user location quadrant
        userQuad = getQuadrant();
        // log("Current user location: " + userQuad);

        // check box matching user's geolocation
        for(var i=0; i<checkboxes.length; i++){
            // log("Quad checkbox: " + checkboxes[i].dataset.quad);

            if(checkboxes[i].dataset.quad === userQuad){
                checkboxes[i].checked = true;

                // show relevant quad
                setMapOnAll('show', getMarkerObjs(userQuad));
            } else {
                checkboxes[i].checked = false;

                // hide other quads
                var quad = checkboxes[i].dataset.quad;
                setMapOnAll('hide', getMarkerObjs(quad));
            }
        }

timer('stop');

      }, function() {
        handleLocationError(false, infoWindow, mapObj.getCenter());
      });
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, mapObj.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos){
   infoWindow.setPosition(pos);
   infoWindow.setContent(browserHasGeolocation ?
       'Error: The Geolocation service failed.' :
       'Error: Your browser doesn\'t support geolocation.');
}
// GEOLOCATION API

// Determine cutoff lat, lng between city quadrants (NW, NE, SE, SW)
    // Treating center of Burnside bridge as axis // This will need refining!
    // lat: 45.523063, lng: -122.667677
    // Anything > lat = N
    // Anything > lng = E
function getQuadrant(){
    var ns = "S";
    var ew = "W";
    var concat;

    if(pos.lat > 45.523063){
        ns = "N";
    }
    if(pos.lng > -122.667677){
        ew = "E";
    }
    concat = ns + ew;
    return concat;
}

// Get subset of brunch array that match quadrant
function getBrunchObjs(quad){
    var subsetArr = [];
    for(var i=0; i<brunchArr.length; i++){
        if(brunchArr[i].nhd === quad){
            subsetArr.push(brunchArr[i]);
        }
    }
    return subsetArr;
}

function getMarkerObjs(quad){
    var quadMarkerArr;
    // log("Fetching quad: " + quad );
    switch(quad){
        case 'NE':
            quadMarkerArr = markerArr_NE;
        break;

        case 'SE':
            quadMarkerArr = markerArr_SE;
        break;

        case 'SW':
            quadMarkerArr = markerArr_SW;
        break;
        // Currently no brunchtrackers in NW
        // case 'NW':
        //     quadMarkerArr = markerArr_NW;
        // break;
    }
    return quadMarkerArr;
}

function convertAllToMarkers(){
    // converts all brunchtrackers to marker objects
    // also fills global quad arrays: markerArr_NE, markerArr_SE, markerArr_SW,

    var arr = [];
    var targetQuadArr;

    for(var i=0; i<brunchArr.length; i++){
        var markerObj = new google.maps.Marker({//user marker
            position: {lat: brunchArr[i].lat, lng: brunchArr[i].lng},
            map: mapObj,
            title: brunchArr[i].title,
            openTime: brunchArr[i].opentime
        });

        markerObj.setAnimation(google.maps.Animation.DROP);
        // this array is returned
        arr.push(markerObj);

        // incidentally add marker objects to correct quad arrays
        // get each brunchtracker quad
        var quad = brunchArr[i].nhd;

        // push corresponding marker object to correct quad array
        targetQuadArr = getMarkerObjs(quad);
        targetQuadArr.push(markerObj);
    }
    return arr;
}

// Sets the map on all markers in the array.
 function setMapOnAll(vis, markerArr){
    // log("marker array length: " + markerArr.length);
   for(var i=0; i < markerArr.length; i++) {
       if(vis === 'show'){
           if(selectedTime){
            //    log('selectedTime: ' + selectedTime);
               if(parseInt(markerArr[i].openTime.replace(':', '')) <= selectedTime){
                //    log(parseInt(markerArr[i].openTime.replace(':', '')));
                   markerArr[i].setMap(mapObj);
               } else {
                   markerArr[i].setMap(null);
               }
           } else {
               markerArr[i].setMap(mapObj);
           }
       } else {
           markerArr[i].setMap(null);
       }
   }
 }

 // TEST MARKERS
     // var marker1 = new google.maps.Marker({
     //     position: {lat: 45.534779, lng: -122.642674},
     //     map: map,
     //     title: 'Spielman Coffee Roaster & Bagels'
     // });
     //
     // var marker2 = new google.maps.Marker({
     //     position: {lat: 45.505019, lng: -122.622889},
     //     map: map,
     //     title: "Tom's Resaraunt"
     // });
 // TEST MARKERS

 // function cleanTime(str){
 //     str = str.replace(':','');
 //     str = str.replace(/am|pm/i, '');
 //     str.trim();
 //     return str;
 // }

 // function findBounds(quadsArr){
 //     var coordsArr = [];
 //
 //     log("quadsArr: " + quadsArr);
 //
 //     for(var i=0; i<quadsArr.length; i++){
 //         var arr = getBrunchObjs(quadsArr[i]);
 //         for(var k=0; k<arr.length; k++){
 //             coordsArr.push(arr[k]);
 //         }
 //     }
 //
 //     // log("coordsArr: " + coordsArr);
 //
 //     var E = coordsArr[0].lng;
 //     var N = coordsArr[0].lat;
 //     var S = coordsArr[0].lat;
 //     var W = coordsArr[0].lng;
 //
 //     for(var j=0; j<coordsArr.length; j++){
 //         var coordLat = coordsArr[i].lat;
 //         var coordLng = coordsArr[i].lng;
 //
 //         if(coordLat > N){
 //             N = coordLat;
 //         }
 //         if(coordLat < S){
 //             S = coordLat;
 //         }
 //         if(coordLng > E){
 //             E = coordLng;
 //         }
 //         if(coordLng < W){
 //             W = coordLng;
 //         }
 //     }
 //     var boundsObj = {east: E, north: N, south: S, west: W};
 //     log("Returning: " + E + " " + N + " " + S + " " + W + " ");
 //     return boundsObj;
 // }
