// GEOLOCATION API
var x = document.getElementById('currentPosition');
var pos;
var map;
var infoWindow;

function initMap() {
    infoWindow = new google.maps.InfoWindow({map: map});
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.523832, lng: -122.676678},//initializes at city center
        zoom: 13,
    });

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


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log("Current Lat, Lng: " + pos.lat + ", " + pos.lng);
        infoWindow.setPosition(pos);//center view on user location
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
        infoWindow.open(map);//shows location. Not necessarily accurate

        var quad = getQuadrant();
        var brunchObjArr = getBrunchObjs(quad);
        var brunchMarkerObjs = convertToMarkers(map, brunchObjArr);
        // console.log(brunchMarkerObjs);

        // USER MARKER //Not necessarily accurate!
        // In case we want to drop a marker at current user location
            // var marker0 = new google.maps.Marker({//user marker
            //     position: {lat: pos.lat, lng: pos.lng},
            //     map: map,
            //     title: 'You Are Here!'
            // });
        // USER MARKER

      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
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

    // console.log("Quadrant: " + ns + ew);
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

// Create only those markers within current quadrant
function convertToMarkers(map, brunchObjArr){
    var arr = [];
    for(var i=0; i<brunchObjArr.length; i++){
        var markerObj = new google.maps.Marker({//user marker
            position: {lat: brunchObjArr[i].lat, lng: brunchObjArr[i].lng},
            map: map,
            title: brunchObjArr[i].title
        });
        arr.push(markerObj);
    }
    return arr;
}
