'use strict';


module.exports.activeCategories = [
    {
        label: 'Edit Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'edit');
        }
    },
    {
        label: 'Archive Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'archive');
        }
    },
    {type: 'separator'},
    {
        label: 'Delete Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'delete');
        }
    },
    {type: 'separator'},
    {
        label: 'New Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'new');
        }
    }
];

module.exports.archivedCategories = [
    {
        label: 'Edit Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'edit');
        }
    },
    {
        label: 'Unarchive Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'unarchive');
        }
    },
    {type: 'separator'},
    {
        label: 'Delete Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'delete');
        }
    },
    {type: 'separator'},
    {
        label: 'New Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'new');
        }
    }
];

