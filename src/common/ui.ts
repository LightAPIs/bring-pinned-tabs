'use strict';

function localString(key?: string) {
  if (key != undefined) {
    return chrome.i18n.getMessage(key);
  }
  return '';
}

export { localString };
