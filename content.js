let TOOLTIPS = []

document.getElementsByTagName('body')[0].addEventListener('mouseup', onMouseUp)


function onMouseUp(e) {
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
    const tooltip = tooltipFactory(selectedText)

    // Add the tooltip to the page
    document.body.appendChild(tooltip);
    TOOLTIPS.push(tooltip)

    positionTooltipOnPage(tooltip, selectedRect.x, selectedRect.y);
}

function tooltipFactory(text) {
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.innerText = text;
    tooltip.style.backgroundColor = '#fff';
    tooltip.style.border = '1px solid #000';
    tooltip.style.borderRadius = '5px';
    tooltip.style.boxShadow = '0px 0px 5px #000';
    tooltip.style.padding = '5px';

    return tooltip;
}

// positon popup on page relative to cursor
// position at time of click event
function positionTooltipOnPage(popup, x, y) {

    let VPWH = [];                  // view port width / height
    let intVPW, intVPH;             // view port width / height
    const intCoordX = x;
    const intCoordY = y;    // distance from click point to view port top
    const intDistanceScrolledUp = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    console.log({intDistanceScrolledUp})
    // distance the page has been scrolled up from view port top
    let intPopupOffsetTop = intDistanceScrolledUp + intCoordY;
    // add the two for total distance from click point y to top of page

    const intDistanceScrolledLeft = document.body.scrollLeft;
    let intPopupOffsetLeft = intDistanceScrolledLeft + intCoordX;

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
}   // end fn positionTooltipOnPage

function getViewport() {
    let viewPortWidth;
    let viewPortHeight;

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