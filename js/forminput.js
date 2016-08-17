var reviewText = "";
var rptContent = document.getElementById("review-content");

//function test (nh1, nh2, nh3) {
//  console.log(nh1.checked, nh2.checked, nh3.checked);
//  //returns boolean true/false for each of the threef
//  var e = document.getElementById("dropdown");
//  var timeChoice = e.options[e.selectedIndex].text;
//  console.log(timeChoice);
//  //returns time in same format as in brunch object
//}

//time select listener
document.getElementById("dropdown").onchange = function() {
    localStorage.setItem('dropdown', document.getElementById("dropdown").value);
}

if (localStorage.getItem('dropdown')) {
    document.getElementById("dropdown").options[localStorage.getItem('dropdown')].selected = true;
}

//tried to compact within loop, but each .onchange listener needs to "live" separately
document.getElementById("cb0").onchange = function() {
  var checkbox = document.getElementById("cb0");
  localStorage.setItem("cb0", checkbox.checked);
}
if (localStorage.getItem("cb0")) {
  var checked = JSON.parse(localStorage.getItem("cb0"));
  document.getElementById("cb0").checked = checked;
}

document.getElementById("cb1").onchange = function() {
  var checkbox = document.getElementById("cb1");
  localStorage.setItem("cb1", checkbox.checked);
}
if (localStorage.getItem("cb1")) {
  var checked = JSON.parse(localStorage.getItem("cb1"));
  document.getElementById("cb1").checked = checked;
}

document.getElementById("cb2").onchange = function() {
  var checkbox = document.getElementById("cb2");
  localStorage.setItem("cb2", checkbox.checked);
}
if (localStorage.getItem("cb2")) {
  var checked = JSON.parse(localStorage.getItem("cb2"));
  document.getElementById("cb2").checked = checked;
}

function reviewPage (review) {
  var e = document.getElementById("restdropdown");
  var restChoice = e.options[e.selectedIndex].text;
  var restText = document.getElementById("reviewtext").value;
    
  //load or set local storage
  if (localStorage.getItem("votes") == null) {
    localStorage.setItem("votes",JSON.stringify(brunchArr));
  } else {
    brunchArr = JSON.parse(localStorage.getItem("votes"));
  }
  
   //helper function for text output
  function reviewOutput () {
    rptContent.innerHTML = "";
    for (var i=0, iLen=brunchArr.length; i<iLen; i++) {
      if (brunchArr[i].upvotes > 0 || brunchArr[i].downvotes > 0) {
        reviewText = brunchArr[i].title + ": " + brunchArr[i].upvotes + " recommend and " + brunchArr[i].downvotes + " don't recommend. " + brunchArr[i].restcomment;
        console.log(reviewText);
        var rev = document.createElement("p");
        rptContent.appendChild(rev);
        var revtext = document.createTextNode(reviewText);
        rev.appendChild(revtext);
      } //if votes
    } //for  
  } 
  
  reviewOutput();
  
  //identify and update proper array member and local store
  for (var i=0, iLen=brunchArr.length; i<iLen; i++) {
    if (brunchArr[i].title === restChoice) {
      if (review.value === "recommend") {
        brunchArr[i].upvotes++;
        brunchArr[i].restcomment += (' "' + restText + '"');
      } else if (review.value === "notrecommend") {
        brunchArr[i].downvotes++;
        brunchArr[i].restcomment += (' "' + restText + '"');
      } //if/else if recommend
      console.log(brunchArr[i]);
      localStorage.setItem("votes",JSON.stringify(brunchArr));
    } //if title ==
  } //for
  
  reviewOutput(); 
}