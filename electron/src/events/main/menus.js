'use strict';

const {BrowserWindow, Menu, ipcMain} = require('electron');

const generalCm = require('../../menus/generalCm');
const inputCm = require('../../menus/inputCm');


ipcMain.on('show-general-context-menu', event => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const menu = Menu.buildFromTemplate(generalCm);
    menu.popup(window);
});

ipcMain.on('show-input-context-menu', event => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const menu = Menu.buildFromTemplate(inputCm);
    menu.popup(window);
});
