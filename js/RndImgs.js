
foodPics = [
  'FoodPics/blubrypncksimages.jpg',
  'FoodPics/brchdrnksimages.jpg',
  'FoodPics/breadsdownload.jpg',
  'FoodPics/breakfastdownload.jpg',
  'FoodPics/brnchtblimages.jpg',
  'FoodPics/brunchdrinksimages.jpg',
  'FoodPics/chefimages.jpg',
  'FoodPics/foodiesfeed.com_perfect-flatwhite-on-summer-afternoon.jpg',
  'FoodPics/foodimages.jpg',
  'FoodPics/wafflesimages.jpg',
  'FoodPics/womenbrnchimages.jpg',
];
function getThreeImages() { //function #2


    pickedImageIndex = [];
    pickedBrunchIndex = []; //clear the "selected images" array
//clear the "selected images" array
    //this array will only hold numbers 0-13 to represent pictures

    //putting 3 images into ids "pic1" through 3 in the HTML
    //when imageID is 1, we are picking the image for "pic1"
    for (var imageID = 1; imageID <= 3; imageID++) {
      /* picks a random number 0 through 13, to pick which image to use */
        do {
          //var index = Math.floor(Math.random() * imgOptions.length);
          var imageIndex = Math.floor(Math.random() * 11); // 0-11
        }while(pickedImageIndex.indexOf(imageIndex)>=0);

        do {
          //var index = Math.floor(Math.random() * imgOptions.length);
          var index = Math.floor(Math.random() * 14); // 0-13
        }while(pickedBrunchIndex.indexOf(index)>=0);  //if that num //if that number is in array, go back
        /* go back & try again if the selected image is in "pickedImageIndex" array */

        //get the image file location from the array
        var image = foodPics[imageIndex];
        var website = brunchArr[index].website;
        var title = brunchArr[index].title;
        var openTime = brunchArr[index].opentime;
        var divtag = document.getElementById('pic' + imageID); // get the div pic1 or pic2, etc
        var img = document.createElement('img'); //create a new image
        img.src = image; //set it up...
        //img.height = 200;
        //img.width = 200; */
        var link = document.createElement('a');
        var time = document.createElement('p');
        link.href = website;
        link.innerHTML = title;
        time.innerHTML = 'Opening Time' +openTime;
        //divtag.innerHTML = ""; //clear the old picture
        divtag.appendChild(img);
        divtag.appendChild(time);
        divtag.appendChild(link);//add the new picture to the div
        pickedImageIndex.push(imageIndex);
        pickedBrunchIndex.push(index);//put the index into the pickedImageIndex array so we dont get it again
    }
};
getThreeImages();
