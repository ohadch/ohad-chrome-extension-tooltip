let TOOLTIPS = []

document.getElementsByTagName('body')[0].addEventListener('mouseup', function(e) {
    // Clear the previous tooltip
    TOOLTIPS.forEach(_tooltip => _tooltip.remove())
    TOOLTIPS = []

    // Get the selected text
    const selection = window.getSelection();
    const selectedText = selection.toString();

    // If there is no selection, do nothing
    if (!selectedText) {
        return;
    }

    // Get the selected text's position
    const selectedRect = selection.getRangeAt(0).getBoundingClientRect();

    // Create the tooltip
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.innerText = selectedText;
    tooltip.style.backgroundColor = '#fff';
    tooltip.style.border = '1px solid #000';
    tooltip.style.borderRadius = '5px';
    tooltip.style.boxShadow = '0px 0px 5px #000';
    tooltip.style.padding = '5px';

    document.body.appendChild(tooltip);
    TOOLTIPS.push(tooltip)

    positionPopupOnPage(tooltip, selectedRect.x, selectedRect.y);

})


// positon popup on page relative to cursor
// position at time of click event
function positionPopupOnPage(popup, x, y) {

    var VPWH = [];                  // view port width / height
    var intVPW, intVPH;             // view port width / height
    var intCoordX = x;
    var intCoordY = y;    // distance from click point to view port top
    var intDistanceScrolledUp = document.body.scrollTop;
    // distance the page has been scrolled up from view port top
    var intPopupOffsetTop = intDistanceScrolledUp + intCoordY;
    // add the two for total distance from click point y to top of page

    var intDistanceScrolledLeft = document.body.scrollLeft;
    var intPopupOffsetLeft = intDistanceScrolledLeft + intCoordX;

    VPWH = getViewport();    // view port Width/Height
    intVPW = VPWH[0];
    intVPH = VPWH[1];

    popup.style.position = 'absolute';
    // if not display: block, .offsetWidth & .offsetHeight === 0
    popup.style.display = 'block';
    popup.style.zIndex = '10100';

    if ( intCoordX > intVPW/2 ) { intPopupOffsetLeft -= popup.offsetWidth; }
    // if x is in the right half of the viewport, pull popup left by its width
    if ( intCoordY > intVPH/2 ) { intPopupOffsetTop -= popup.offsetHeight; }
    // if y is in the bottom half of view port, pull popup up by its height

    popup.style.top = intPopupOffsetTop + 'px';
    popup.style.left = intPopupOffsetLeft + 'px';
}   // end fn positionPopupOnPage

function getViewport() {

    var viewPortWidth;
    var viewPortHeight;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
        viewPortWidth = window.innerWidth,
            viewPortHeight = window.innerHeight
    }

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0) {
        viewPortWidth = document.documentElement.clientWidth,
            viewPortHeight = document.documentElement.clientHeight
    }

    // older versions of IE
    else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }
    return [viewPortWidth, viewPortHeight];
}