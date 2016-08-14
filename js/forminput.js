function test (nh1, nh2, nh3) {
  console.log(nh1.checked, nh2.checked, nh3.checked);
  //returns boolean true/false for each of the three
  var e = document.getElementById("dropdown");
  var timeChoice = e.options[e.selectedIndex].text;
  console.log(timeChoice);
  //returns time in same format as in brunch object
}

document.getElementById("dropdown").onchange = function() {
    localStorage.setItem('dropdown', document.getElementById("dropdown").value);
}

if (localStorage.getItem('dropdown')) {
    document.getElementById("dropdown").options[localStorage.getItem('dropdown')].selected = true;
}