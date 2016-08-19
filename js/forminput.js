var reviewText = "";
var rptContent = document.getElementById("review-content");

//time select listener
document.getElementById("dropdown").onchange = function() {
    localStorage.setItem('dropdown', document.getElementById("dropdown").value);
};

if (localStorage.getItem('dropdown')) {
    document.getElementById("dropdown").options[localStorage.getItem('dropdown')].selected = true;
}

//tried to compact within loop, but each .onchange listener needs to "live" separately
document.getElementById("cb0").onchange = function() {
    var checkbox = document.getElementById("cb0");
    localStorage.setItem("cb0", checkbox.checked);
};
if (localStorage.getItem("cb0")) {
    var checked = JSON.parse(localStorage.getItem("cb0"));
    document.getElementById("cb0").checked = checked;
}

document.getElementById("cb1").onchange = function() {
    var checkbox = document.getElementById("cb1");
    localStorage.setItem("cb1", checkbox.checked);
};
if (localStorage.getItem("cb1")) {
    var checked = JSON.parse(localStorage.getItem("cb1"));
    document.getElementById("cb1").checked = checked;
}

document.getElementById("cb2").onchange = function() {
    var checkbox = document.getElementById("cb2");
    localStorage.setItem("cb2", checkbox.checked);
};
if (localStorage.getItem("cb2")) {
    var checked = JSON.parse(localStorage.getItem("cb2"));
    document.getElementById("cb2").checked = checked;
}

function reviewOutput () {
    var thumbup = "<img src='img/thumbsup.jpg'>";
    var thumbdown = "<img src='img/thumbsdown.jpg'>";
    rptContent.innerHTML = "";

    //load or set local storage
    if (localStorage.getItem("votes") === null) {
        localStorage.setItem("votes",JSON.stringify(brunchArr));
    } else {
        brunchArr = JSON.parse(localStorage.getItem("votes"));
    }

    for (var i=0, iLen=brunchArr.length; i<iLen; i++) {
        if (brunchArr[i].upvotes > 0 || brunchArr[i].downvotes > 0) {
            var recs = "";
            if (brunchArr[i].upvotes > 0) {
                for (var v=0; v < brunchArr[i].upvotes; v++) {
                    recs += thumbup;
                } //for upvotes
            } //if upvotes
            if (brunchArr[i].downvotes > 0) {
                for (var w=0; w < brunchArr[i].downvotes; w++) {
                    recs += thumbdown;
                } //for downvotes
            } //if downvotes
            rptContent.innerHTML += "<br>" + brunchArr[i].title + "<br>";
            rptContent.innerHTML += recs + "<br>";
            rptContent.innerHTML += brunchArr[i].restcomment + "<br>";
        } // if any votes
    } //for brunchArr
}

function reviewPage (review) {
    var e = document.getElementById("restdropdown");
    var restChoice = e.options[e.selectedIndex].text;
    var restText = document.getElementById("reviewtext").value;

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
            localStorage.setItem("votes",JSON.stringify(brunchArr));
        } //if title ==
    } //for

    reviewOutput();
}
