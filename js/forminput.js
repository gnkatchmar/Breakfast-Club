function test (nh1, nh2, nh3) {
  console.log(nh1.checked, nh2.checked, nh3.checked);
  //returns boolean true/false for each of the threef
  var e = document.getElementById("dropdown");
  var timeChoice = e.options[e.selectedIndex].text;
  console.log(timeChoice);
  //returns time in same format as in brunch object
}

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

//// Event listener for first two review form elements unsure if needed
//window.addEventListener('load', function(){
//    var formEl_rselect = document.forms.restselect;
//    console.log(formEl_rselect);
//    document.getElementById('restselect').addEventListener('change', function(e){
//
//        // when radio buttons are changed,
//        if(e.target.tagName === 'INPUT'){
//            var vote = e.target.value;
//            console.log(vote);
//
//        // when select is changed
//        } else if(e.target.tagName === 'SELECT'){
//            selectedRest = e.target.options[e.target.selectedIndex].text;
//            console.log(selectedRest);
//        }
//    });
//});

function test2 (review) {
  var e = document.getElementById("restdropdown");
  var restChoice = e.options[e.selectedIndex].text;
  console.log(restChoice);console.log(review.value);
  var f = document.getElementById("reviewtext").value;
  console.log(f);

 }

