var advancedSearchButton = document.getElementById('AdvancedSearch');
advancedSearchButton.addEventListener("click",transitionToSearch);

function transitionToSearch (){
  var launchpage = document.getElementById('launchpage');
  launchpage.setAttribute("class", "fadeout");
  var searchpage = document.getElementById('searchpage');
  searchpage.setAttribute("class", "fadein");
}
