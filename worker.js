chrome.action.onClicked.addListener((tab) => {
    // run toggleFilter() in context of the current tab
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: toggleFilter,
    })
})

function toggleFilter() {
    const ID = 'tg-filter-layer'

    // search for an existing filter layer
    let div = document.getElementById(ID)

    if (div) {
        // existing filter layer is present, toggle visibility
        div.hidden = !div.hidden
    } else {
        // filter layer not present

        // create and inject the layer
        div = document.createElement('div')
        div.id = ID
        document.body.appendChild(div)

        // construct and inject styles
        let sheet = new CSSStyleSheet()
        sheet.replaceSync(`#${ID} {
            /* fill viewport, on top of everything */
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            z-index: 9999999999;

            /* don't block interaction */
            pointer-events: none;

            /* effectively removes saturation of any color in the viewport */
            background-color: #fff;
            mix-blend-mode: hue;
        }`)
        document.adoptedStyleSheets = [sheet]
    }
}
