'use strict';

import { tabIdsFilter, findPinnedTabs } from './common/filter';
import { getStorage } from './common/storage';
import { moveTabs } from './common/operation';

chrome.windows.onCreated.addListener(
  async (win) => {
    if (!chrome.runtime.lastError && win.id != undefined) {
      const storage = await getStorage();
      const { enable, mode } = storage;
      if (!enable) {
        return;
      }
      const allWindows = await chrome.windows.getAll({
        populate: true,
        windowTypes: ['normal'],
      });
      const pinnedTabs = findPinnedTabs(allWindows, win.id);
      const tabIds = tabIdsFilter(pinnedTabs);
      if (tabIds.length > 0) {
        let tabs: chrome.tabs.Tab[] = [];
        if (mode === 'copy') {
          const dupTabs: chrome.tabs.Tab[] = [];
          for (const val of tabIds) {
            const dupTab = await chrome.tabs.duplicate(val);
            if (dupTab) {
              dupTabs.push(dupTab);
            }
          }
          const dupTabIds = tabIdsFilter(dupTabs);
          if (dupTabIds.length > 0) {
            tabs = await moveTabs(dupTabIds, win.id);
          }
        } else {
          tabs = await moveTabs(tabIds, win.id);
        }

        tabs.forEach((tab) => {
          if (tab.id) {
            chrome.tabs.update(tab.id, {
              pinned: true,
            });
          }
        });
      }
    }
  },
  {
    windowTypes: ['normal'],
  }
);
