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
    log(rand);
    return rand;
}

function initPhotos(){
    getPlacePhotos();
}

// Fill photoUrls arrays with images of brunchtracker with this pId
function getPlacePhotos(){
    var indx = getRandom(brunchArr.length);
    var placeObj = brunchArr[indx];

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

            for(var i=0; i<3; i++){//limt to 2 images
                if(photos[i]){
                    url = photos[i].getUrl({'maxWidth':size, 'maxHeight':size});
                } else {
                    i--;
                }
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
    var photoUrl = brunchArr[indx].imgs[1][getRandom(3)];
    var n = imgsFilled+1;
    log("Filling ID: " + n);
    document.getElementById('pic' + n).innerHTML = "<figure><img src='" + photoUrl + "'></figure><figcaption><div class='f-title'>" + brunchObj.title + "</div><div class='f-time'>Open: " + brunchObj.opentime + "</div><div><a href='" + brunchObj.website + "' class='f-site' target='blank'>website</div></figcaption>";
    // document.getElementById('launchpageimages').display = block;
}
