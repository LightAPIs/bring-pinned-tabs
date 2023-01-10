'use strict';

function tabIdsFilter(tabs: chrome.tabs.Tab[]) {
  const tabIds: number[] = [];
  tabs.forEach((tab) => {
    const { id } = tab;
    if (id != undefined) {
      tabIds;
    }
  });

  return tabs.map((tab) => tab.id).filter((v) => v != undefined) as number[];
}

function findPinnedTabs(
  allWindows: chrome.windows.Window[],
  currentWinId: number
) {
  const len = allWindows.length;
  let currentState = false;

  for (let i = len - 1; i >= 0; i--) {
    if (currentState) {
      const tabs = allWindows[i].tabs;
      if (tabs) {
        return tabs.filter((tab) => tab.pinned);
      }
    } else {
      if (allWindows[i].id === currentWinId) {
        currentState = true;
      }
    }
  }
  return [];
}

export { tabIdsFilter, findPinnedTabs };
