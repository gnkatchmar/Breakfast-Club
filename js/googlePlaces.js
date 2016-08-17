var service;
var imgsFilled = 0;
var photosObj = {
    global_pId: null,
    indx : null,
    // defining dimensions of images [sm] [md] [lg] [xl]
    photoSizes: [100, 300, 500, 800],//sizes: sm, md, lg, xl
};

// Utility function
function resetPhotosObj(){
    photosObj.global_pId = null;
    photosObj.photoUrlArrs = [[],[],[],[]];
}

// Utility function
// Returns a tracker object by Google placeId
function getTrackerObj(pId){
    for(var i=0; i<brunchArr.length; i++){
        if(brunchArr[i].pId === pId){
            photosObj.indx = i;
            return brunchArr[i];
        }
    }
}

// Utility function
function getRandom(bounds){
    var rand = Math.floor(Math.random() * bounds);
    log("Random num: " + rand);
    return rand;
}

function initPhotos(){
    getPlacePhotos();
}

// Fill photoUrls arrays with images of brunchtracker with this pId
function getPlacePhotos(){
    var indx = getRandom(brunchArr.length);
    var placeObj = brunchArr[indx];
    log("Querying GooglePlaces for " + brunchArr[indx].title + " | (brunchArr[index]) = " + indx);

    if(!placeObj.hasOwnProperty('imgs')){
        // log('getPlacePhotos');
        photosObj.global_pId = placeObj.pId;
        photosObj.indx = indx;
        // log("INDX " + photosObj.indx);

        var request = {
            placeId: placeObj.pId
        };

        if(!service){
            service = new google.maps.places.PlacesService(mapObj);
        }
        service.getDetails(request, callback);
    } else {
        console.log("This tracker already has images! Exiting...");
        // Fix this: If a random number is a repeat try again,
        // don't exit
    }
}

// Fill the photUrls arrays
function callback(place, status){
    if (status == google.maps.places.PlacesServiceStatus.OK){
        console.log("CALLBACK INDX " + photosObj.indx);
        var photos = place.photos;
        var url;
        var urlMasterArr = [];

        // for each photo size defined above
        var photoSizes = photosObj.photoSizes;

        // for each img size in global, grab 1 image
        // push that to an array
        // put all those in a single array and attach to brunch object as img prop
        for(var j=0; j<photoSizes.length; j++){
            var size = photoSizes[j];
            var sizedArr = [];
            var maxPics = 3;

            for(var i=0; i<maxPics; i++){//limt to 2 images
                if(photos[i]){
                    url = photos[i].getUrl({'maxWidth':size, 'maxHeight':size});
                }
                // else {
                //     log("There were no photos for this place. Index = " + photosObj.indx);
                //     maxPics++;
                // }
                // if no photos, do something else
                sizedArr.push(url);
            }
            urlMasterArr.push(sizedArr);
        }
        // attach imgs property to brunch object
        brunchArr[photosObj.indx].imgs = urlMasterArr;

        // // draw photos on page1
        log("drawing index " + photosObj.indx);
        drawPhotos(brunchArr[photosObj.indx], 'md', 1);
        imgsFilled++;

        if(imgsFilled < 3){
            getPlacePhotos();
        }
        // console.log('end callback');
    }
}

function drawPhotos(brunchObj, size, quantity){
    log("Drawing photos for " + brunchObj.title);
    var activePhotoUrlArr;

    var indx = photosObj.indx;
    var website = brunchArr[indx].website;
    var title = brunchArr[indx].title;
    var openTime = brunchArr[indx].opentime;
    var photoUrl;
    if(brunchArr[indx].imgs[1].length > 0){
        photoUrl = brunchArr[indx].imgs[1][getRandom(brunchArr[indx].imgs[1].length)];
    } else {
        log("No photos available for this location. Rolling again.");
        photoUrl = brunchArr[getRandom(brunchArr.length)].imgs[1][getRandom(brunchArr[indx].imgs[1].length)];
    }
    var n = imgsFilled+1;
    var target = 'pic' + n;
    var container = 'container_img' + imgsFilled;
    log("Filling ID: " + n);

    document.getElementById(target).innerHTML = "<figure id='" + container + "' class='invisible'><img src='" + photoUrl + "'></figure><figcaption><div class='f-title'>" + brunchObj.title + "</div><div class='f-time'>Open: " + brunchObj.opentime + "</div><div><a href='" + brunchObj.website + "' class='f-site' target='blank'>website</div></figcaption>";
    // document.getElementById('launchpageimages').display = block;

    // setTimeout(function(){
    //     replaceClass('launchpageimages', 'closed', 'open');
    // }, 800);

    setTimeout(function(){
        replaceClass(target, 'invisible', 'visible');
    }, 500);

    setTimeout(function(){
        replaceClass(container, 'invisible', 'visible');
    }, 800);
}

// utility functions
function addClass(id, newClass){
    var el = document.getElementById(id);
    var currentClass = el.className;
    document.getElementById(id).className = currentClass + " " + newClass;
}

function removeClass(id, remClass){
    var el = document.getElementById(id);
    var currentClass = el.className;
    document.getElementById(id).className = currentClass.replace(currentClass, remClass).trim();
}

function replaceClass(id, oldClass, newClass){
    var el = document.getElementById(id);
    var currentClass = el.className;
    document.getElementById(id).className = currentClass.replace(oldClass, newClass).trim();
}

// TEST CODE ----------------------------------------------------------------

function testPhoto(n){
    var pId = brunchArr[n].pId;
    log("Testing photo of " + brunchArr[n].title);
    var request = {
        placeId: pId
    };
    if(!service){
        service = new google.maps.places.PlacesService(mapObj);
    }
    service.getDetails(request, testCallback);
}

// Fill the photUrls arrays
function testCallback(place, status){
    if (status == google.maps.places.PlacesServiceStatus.OK){
        var photos = place.photos;
        var url = photos[0].getUrl({'maxWidth':150, 'maxHeight':150});
        document.getElementById('container_googlePhotos').innerHTML = "<img src='" + url + "'>";
    }
}
