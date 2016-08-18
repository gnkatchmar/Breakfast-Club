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
            display(pageId, 1);
            display('searchpage', 0);
            display('reviews', 0);
        break;

        case 'searchpage':
            display('launchpage', 0);
            display(pageId, 1);
            display('reviews', 1);
            // refresh map
            google.maps.event.trigger(mapObj, 'resize');
        break;

        case 'reviews':
            display('launchpage', 1);
            display('searchpage', 0);
            display(pageId, 0);
        break;
    }
}

document.getElementById('AdvancedSearch').addEventListener('click', function(){visPage('searchpage');});
