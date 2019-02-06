'use strict';

const {BrowserWindow, Menu, ipcMain} = require('electron');

const generalCm = require('../../menus/generalCm');
const generalMenu = Menu.buildFromTemplate(generalCm);

const inputCm = require('../../menus/inputCm');


ipcMain.on('show-general-context-menu', event => {
    const window = BrowserWindow.fromWebContents(event.sender);
    generalMenu.popup(window);
});

ipcMain.on('toggle-copy-general-cm', (event, enabled) => {
    generalMenu.getMenuItemById('copy').enabled = enabled;
});

ipcMain.on('show-input-context-menu', event => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const menu = Menu.buildFromTemplate(inputCm);
    menu.popup(window);
});
