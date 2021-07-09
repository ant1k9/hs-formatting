const updatePopup = function() {
  return function(res) {
    let body = encodeURIComponent(res[0].result);

    fetch(
      "https://hyperservices.herokuapp.com/format", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest"
        },
        "body": `text=${body}`,
        "method": "POST",
      }
    ).then(response => response.json()).
      then(data => {
        document.getElementById("spinner").hidden = true;
        document.getElementById("text-container").innerHTML = data["html"]
      }
    )
  }
}

const format = function() {
  chrome.tabs.query(
    { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    function(tabs) {
      if (tabs[0].url.match(/.*stepik.org.*\/step\/1([^\d]|$)/))
        chrome.scripting.executeScript(
          {
            target: {tabId: tabs[0].id},
            function: () => document.
              getElementsByClassName('html-content')[0].
              getElementsByTagName('span')[0].
              innerHTML
          },
          updatePopup(),
        );
    }
  )
}

/* call on load */
format();
