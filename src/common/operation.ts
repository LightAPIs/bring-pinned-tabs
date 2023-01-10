'use strict';

async function moveTabs(tabIds: number[], windowId: number) {
  let tabs: chrome.tabs.Tab[] = [];
  //? chrome.tabs.move return Tab|Tab[]
  tabs = tabs.concat(
    await chrome.tabs.move(tabIds, {
      index: 0,
      windowId,
    })
  );
  return tabs;
}

export { moveTabs };
