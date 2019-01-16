"use strict";

// onload event listener
window.addEventListener('load',() => {
    // hemepage init
    document.getElementById('homepage').style.display = 'block';
    // page switcher listener
    pageLinkClickHandler();
})

// page link click event listener
function pageLinkClickHandler() {
    let navbar = document.getElementById('navbar')
    navbar.addEventListener('click', (e) => linkClickSwitcher(e.target.id))
}

// page link click helper function
function linkClickSwitcher(linkname) {
    switch(linkname) {
        case 'homelink':
        pageDisplayControler('homepage')
        break;
        case 'resumelink':
        pageDisplayControler('resumepage')
        break;
        case 'workslink':
        pageDisplayControler('workspage')
        break;
        case 'commentslink':
        pageDisplayControler('commentspage')
        break;
        default:
    }
}

// page display controler
function pageDisplayControler(activePageId) {
    let pageIdList = ['homepage', 'resumepage', 'workspage', 'commentspage']
    pageIdList.map(pageId => {
        let displayValue = pageId === activePageId ? 'block' : 'none';
        document.getElementById(pageId).style.display = displayValue;
    })
}