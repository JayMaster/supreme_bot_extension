// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

console.log('background running');

chrome.browserAction.onClicked.addListener(buttonClicked);

// console.log(chrome.tabs);

function buttonClicked(tab) {
  let msg = {
    txt: 'hello',
    tab
  };
  chrome.tabs.sendMessage(tab.id, msg);
}