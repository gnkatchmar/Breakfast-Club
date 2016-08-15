// Each array contains urls of images sized to the dimensions specified below
// Image dimensions used to fill photoUrls arrays above
// Changing these numbers will alter the urls in the photoUrls arrays
    // Used to more easily fill the photoUrls arrays above
var photosObj = {
    global_pId: null,

    // defining dimensions of images [sm] [md] [lg] [xl]
    photoSizes: [100, 300, 500, 800],//sizes: sm, md, lg, xl

    // container for image Url's of sizes [sm] [md] [lg] [xl]
    // this array is attached to a brunchtracker when getPlacePhotos(pId) is called
    // where pId is that object's pId property
    photoUrlArrs: [[], [], [], []]
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
            return brunchArr[i];
        }
    }
}

// Fill photoUrls arrays with images of brunchtracker with this pId
function getPlacePhotos(pId){
    if(!getTrackerObj(pId).hasOwnProperty('imgs')){
        photosObj.global_pId = pId;
        var request = {
            placeId: pId
        };
        var service = new google.maps.places.PlacesService(mapObj);
        service.getDetails(request, callback);
    } else {
        console.log("This tracker already has images! Exiting...");
    }
}

// Fill the photUrls arrays
function callback(place, status){
    if (status == google.maps.places.PlacesServiceStatus.OK){
        // console.log(place.name);
        var photos = place.photos;
        var url;

        // for each photo size defined above
        var photoSizes = photosObj.photoSizes;
        for(var j=0; j<photoSizes.length; j++){
            var size = photoSizes[j];

            // get corresponding UrlArray
            var urlArr = photosObj.photoUrlArrs[j];
            // console.log("Filling array: " + size);

            // fill that array with correctly sized image urls
            for(var i=0; i<photos.length; i++){
                url = photos[i].getUrl({'maxWidth':size, 'maxHeight':size});
                urlArr.push(url);
                // console.log(urlArr);
            }
        }
        addPhotosToTracker(photosObj.global_pId);
    }
}

function addPhotosToTracker(pId){
    var brunchTrackerObj = getTrackerObj(pId);

    if(!brunchTrackerObj.hasOwnProperty('imgs')){
        brunchTrackerObj.imgs = [photosObj.photoUrlArrs[0].slice(), photosObj.photoUrlArrs[1].slice(), photosObj.photoUrlArrs[2].slice(), photosObj.photoUrlArrs[3].slice()];
        console.log('Added imgs to tracker object!');
        resetPhotosObj();

        // Next line just for demo.
        // Comment out to stop auto-drawing photos---------------------
        drawPhotos(getTrackerObj(pId),'container_googlePhotos', 'sm', 5);
    } else {
        console.log("This tracker already has images! Exiting...");
    }
}

function drawPhotos(brunchtrackerObj, targetContainer, size, quantity){
    console.log("Drawing photos for " + brunchtrackerObj.title);
    var target = document.getElementById(targetContainer);
    var activePhotoUrlArr;
    target.innerHTML = "";

    switch(size){
        case 'sm':
            activePhotoUrlArr = brunchtrackerObj.imgs[0];
        break;

        case 'md':
            activePhotoUrlArr = brunchtrackerObj.imgs[1];
        break;

        case 'lg':
            activePhotoUrlArr = brunchtrackerObj.imgs[2];
        break;

        case 'xl':
            activePhotoUrlArr = brunchtrackerObj.imgs[3];
        break;
    }

    if(quantity > activePhotoUrlArr.length){
        quantity = activePhotoUrlArr.length;
    }

    for(var i=0; i<quantity; i++){
        var url = activePhotoUrlArr[i];
        target.innerHTML += "<img src='" + url + "'/>";
    }
}
