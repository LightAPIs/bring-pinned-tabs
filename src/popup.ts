'use strict';

import './popup.css';
import { getStorage, setEnable, setMode, ModeType } from './common/storage';
import { localString } from './common/ui';

(function () {
  class StateSet {
    private mainSwitch: HTMLElement;
    private moveMode: HTMLElement;
    private copyMode: HTMLElement;
    private enable: boolean;
    private mode: ModeType;
    constructor(
      mainSwitch: HTMLElement,
      moveMode: HTMLElement,
      copyMode: HTMLElement,
      enable: boolean,
      mode: ModeType
    ) {
      this.mainSwitch = mainSwitch;
      this.moveMode = moveMode;
      this.copyMode = copyMode;
      this.enable = enable;
      this.mode = mode;
    }

    init() {
      this.changeMainSwitchState();
      this.mainSwitch.addEventListener('click', () => {
        this.enable = !this.enable;
        setEnable(this.enable);
        this.changeMainSwitchState();
      });

      this.changeModeState();
      this.moveMode.addEventListener('click', () => {
        if (this.mode !== 'move') {
          this.mode = 'move';
          setMode(this.mode);
        }
        this.changeModeState();
      });
      this.copyMode.addEventListener('click', () => {
        if (this.mode !== 'copy') {
          this.mode = 'copy';
          setMode(this.mode);
        }
        this.changeModeState();
      });
    }

    changeMainSwitchState() {
      StateSet.changeElementState(this.mainSwitch, this.enable);
    }

    changeModeState() {
      const s = this.mode === 'copy';
      StateSet.changeElementState(this.copyMode, s);
      StateSet.changeElementState(this.moveMode, !s);
    }

    static changeElementState(ele: HTMLElement, state: boolean) {
      ele.classList.remove('enable');
      state && ele.classList.add('enable');
    }
  }

  function i18n() {
    const textItems = document.querySelectorAll(
      '.i18n-text'
    ) as NodeListOf<HTMLElement>;
    textItems.forEach((item) => {
      const key = item.dataset.key;
      item.textContent = localString(key);
    });

    const titleItems = document.querySelectorAll(
      '.i18n-title'
    ) as NodeListOf<HTMLElement>;
    titleItems.forEach((item) => {
      const key = item.dataset.key;
      item.title = localString(key);
    });
  }

  async function main() {
    const storage = await getStorage();
    const { enable, mode } = storage;
    const mainSwitch = document.querySelector(
      '.main-switch'
    ) as HTMLButtonElement;
    const moveMode = document.querySelector('.move-mode') as HTMLButtonElement;
    const copyMode = document.querySelector('.copy-mode') as HTMLButtonElement;

    const state = new StateSet(mainSwitch, moveMode, copyMode, enable, mode);
    state.init();
    i18n();
  }

  main();
})();
