function vis(id, state){
    var el = document.getElementById(id);
    if(state === 0){
        el.className = 'invisible';
    } else {
        el.className = 'visible';
    }
}

// show a page by name
// hide other 2
function visPage(pageId){
    switch(pageId){
        case 'launchpage':
            vis(pageId, 1);
            vis('searchpage', 0);
            vis('reviews', 0);
        break;

        case 'searchpage':
            vis('launchpage', 0);
            vis(pageId, 1);
            vis('reviews', 0);
            // refresh map
            google.maps.event.trigger(mapObj, 'resize');
        break;

        case 'reviews':
            vis('launchpage', 1);
            vis('searchpage', 0);
            vis(pageId, 0);
        break;
    }
}

document.getElementById('AdvancedSearch').addEventListener('click', function(){visPage('searchpage');});
