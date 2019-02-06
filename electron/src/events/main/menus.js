'use strict';

const {BrowserWindow, Menu, ipcMain} = require('electron');


const inputCm = require('../../menus/inputCm');

ipcMain.on('show-input-context-menu', event => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const menu = Menu.buildFromTemplate(inputCm);
    menu.popup(window);
});
