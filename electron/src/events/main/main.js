'use strict';

const {ipcMain, dialog, BrowserWindow} = require('electron');

/*
*    options: {
*        type, message, detail, buttons, eventNames
*    }
*/
ipcMain.on('show-dialog', (event, options) => {
    dialog.showMessageBox({
        message: options.message,
        detail: options.detail,
        buttons: options.buttons,
        type: options.type,
        defaultId: 0,
        cancelId: 1
    }, response => {
        if (response === 0) {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            for (const eventName of options.eventNames) {
                focusedWindow.send(eventName, options.data);
            }
        }
    });
});
