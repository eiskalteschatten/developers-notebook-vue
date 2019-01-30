'use strict';

const {BrowserWindow, Menu, ipcMain} = require('electron');


const inputCm = require('../../menus/inputCm');
const {activeCategories, archivedCategories} = require('../../menus/categoryCm');


// ipcMain.on('switch-theme', (event, theme) => {
//     switchMenu(theme);
// });

ipcMain.on('show-input-context-menu', event => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const menu = Menu.buildFromTemplate(inputCm);
    menu.popup(window);
});

ipcMain.on('show-category-context-menu', (event, type) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const template = type === 'categoryArchive' ? archivedCategories : activeCategories;
    const menu = Menu.buildFromTemplate(template);
    menu.popup(window);
});
