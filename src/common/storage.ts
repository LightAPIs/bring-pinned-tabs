'use strict';

type ModeType = 'move' | 'copy';

interface StorageItems {
  enable: boolean;
  mode: ModeType;
}

async function getStorage() {
  const defalutItems: StorageItems = {
    enable: true,
    mode: 'move',
  };
  const items = (await chrome.storage.local.get([
    'enable',
    'mode',
  ])) as StorageItems;
  return Object.assign(defalutItems, items);
}

function setEnable(value: boolean) {
  chrome.storage.local.set({
    enable: value,
  });
}

function setMode(value: ModeType) {
  chrome.storage.local.set({
    mode: value,
  });
}

export { getStorage, setEnable, setMode, ModeType };
