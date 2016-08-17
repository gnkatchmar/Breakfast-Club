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
    NW: {
        coords: {lat: 45.529873, lng: -122.694569},
        zoom: 14
    },
    EASTSIDE: {
        coords: {lat: 45.519922, lng: -122.590758},
        zoom: 14
    },
    SOUTHSIDE: {
        coords: {lat: 45.495202, lng: -122.664215},
        zoom: 14
    }
};

var log = function(t){
    console.log(t);
};

// Event listener for form elements
window.addEventListener('load', function(){
    initPhotos();
    var formEl_nhood = document.forms.nhoodselect;
    document.getElementById('timeandlocation').addEventListener('change', function(e){

        // when checkboxes are changed,
        // show/hide corresponding markers
        if(e.target.tagName === 'INPUT'){
            var val = e.target.value;
            var selectedCoords = [];
            var selectedQuads = [];

            visByCheckbox();

        // when select is changed
        // only show markers with opentime less than or equal to select value
        } else if(e.target.tagName === 'SELECT'){
            selectedTime = parseInt(e.target.options[e.target.selectedIndex].text.replace(':', ''));
            visByCheckbox();
        }
    });

    document.getElementById('btn_nearBy').addEventListener('click', function(){
        enable_geoloc();
    });
});

function visByCheckbox(){
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    var checkedQuads = [];

    for(var i=0; i<checkboxes.length; i++){
        var quad = checkboxes[i].dataset.quad;

        // show/hide markers based on checked boxes
        if(checkboxes[i].checked){
            setMapOnAll('show', getMarkerObjs(quad));
            checkedQuads.push(quad);
        } else {
            setMapOnAll('hide', getMarkerObjs(quad));
        }
    }
    zoomTo(checkedQuads);
}

function zoomTo(quadArr){
    console.log(quadArr);
    var options;
    if(quadArr.length === 1){
        options = mapOptions[quadArr[0]];
    } else if(quadArr.length === 3){
        options = mapOptions.cityCenter;
    } else {
        if(quadArr.indexOf('NE') && quadArr.indexOf('SW')){
            options = mapOptions.cityCenter;
        } else if(quadArr.indexOf('NE') && quadArr.indexOf('SE')){
            options = mapOptions.EASTSIDE;
        } else {
            options = mapOptions.SOUTHSIDE;
        }
    }
    mapObj.panTo(options.coords);
    mapObj.setZoom(options.zoom);
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
//     if (navigator.geolocation){
//       navigator.geolocation.getCurrentPosition(function(position){
//
// timer('start');
//
//         pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };
//
//         // log("Current Lat, Lng: " + pos.lat + ", " + pos.lng);
//         infoWindow.setPosition(pos);//center view on user location
//         infoWindow.setContent('Location found.');
//         mapObj.setCenter(pos);
//         // infoWindow.open(mapObj);//shows location. Not necessarily accurate
//
//         // get current user location quadrant
//         userQuad = getQuadrant();
//         // log("Current user location: " + userQuad);
//
//         // check box matching user's geolocation
//         for(var i=0; i<checkboxes.length; i++){
//             // log("Quad checkbox: " + checkboxes[i].dataset.quad);
//
//             if(checkboxes[i].dataset.quad === userQuad){
//                 checkboxes[i].checked = true;
//
//                 // show relevant quad
//                 setMapOnAll('show', getMarkerObjs(userQuad));
//             } else {
//                 checkboxes[i].checked = false;
//
//                 // hide other quads
//                 var quad = checkboxes[i].dataset.quad;
//                 setMapOnAll('hide', getMarkerObjs(quad));
//             }
//         }
//
// timer('stop');
//
//       }, function() {
//         handleLocationError(false, infoWindow, mapObj.getCenter());
//       });
//       // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, mapObj.getCenter());
//     }
}

function enable_geoloc(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){

// timer('start');

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

// timer('stop');

      }, function() {
        handleLocationError(false, infoWindow, mapObj.getCenter());
      });
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, mapObj.getCenter());
  } else {
      alert("Your browser doesn't seem to support geolocation. Bummer.");
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
