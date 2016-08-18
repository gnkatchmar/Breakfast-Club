function vis(id, state){
    var el = document.getElementById(id);
    if(state === 0){
        el.className = 'invisible';
    } else {
        el.className = 'visible';
    }
}

function display(id, state){
    var el = document.getElementById(id);
    if(state === 0){
        el.className = 'none';
    } else {
        el.className = 'block';
    }
}

// show a page by name
// hide other 2
function visPage(pageId){
    switch(pageId){
        case 'launchpage':
            display('launchpage', 1);
            display('searchpage', 0);
            display('reviews', 0);
        break;

        case 'searchpage':
            display('launchpage', 0);
            display('searchpage', 1);
            display('reviews', 0);
            // refresh map
            google.maps.event.trigger(mapObj, 'resize');
        break;

        case 'reviews':
            display('launchpage', 0);
            display('searchpage', 0);
            display('reviews', 1);
            reviewOutput();
        break;
    }
}

// add nav event system
document.getElementById('nav_main').addEventListener('click', function(e){
    // log(e.target.id);
    switch(e.target.id.toLowerCase()){
        case "nav-home":
            visPage('launchpage');
        break;

        case "nav-search":
            visPage('searchpage');
        break;

        case "nav-review":
            visPage('reviews');
        break;
    }
});
