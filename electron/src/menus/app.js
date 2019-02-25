'use strict';

const {app, shell} = require('electron');

const config = require('../config/config');

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New',
                submenu: [
                    {
                        label: 'Client',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.send('open-route-name', 'clients', { query: { new: true } });
                        }
                    },
                    {
                        label: 'Project',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.send('open-route-name', 'projects', { query: { new: true } });
                        }
                    },
                    {
                        label: 'Category',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.send('open-route-name', 'categories', { query: { new: true } });
                        }
                    }
                ]
            },
            {type: 'separator'},
            {role: 'close'}
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'pasteandmatchstyle'},
            {role: 'delete'},
            {role: 'selectall'}
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Dashboard',
                accelerator: 'CmdOrCtrl+1',
                click: async (item, focusedWindow) => {
                    focusedWindow.webContents.send('open-route-name', 'home');
                }
            },
            {
                label: 'Clients',
                accelerator: 'CmdOrCtrl+2',
                click: async (item, focusedWindow) => {
                    focusedWindow.webContents.send('open-route-name', 'clients');
                }
            },
            {
                label: 'Projects',
                accelerator: 'CmdOrCtrl+3',
                click: async (item, focusedWindow) => {
                    focusedWindow.webContents.send('open-route-name', 'projects');
                }
            },
            {
                label: 'Categories',
                accelerator: 'CmdOrCtrl+4',
                click: async (item, focusedWindow) => {
                    focusedWindow.webContents.send('open-route-name', 'categories');
                }
            },
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'},
            {type: 'separator'},
            {
                label: 'Advanced',
                submenu: [
                    {role: 'reload'},
                    {role: 'forcereload'},
                    {role: 'toggledevtools'}
                ]
            },
        ]
    },
    {
        role: 'window',
        submenu: [
            {role: 'minimize'}
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'About Alex Seifert',
                click: () => { shell.openExternal('https://www.alexseifert.com'); }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            {
                label: `About ${config.app.name}`,
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.send('open-modal', 'about');
                }
            },
            {type: 'separator'},
            {
                label: 'Preferences...',
                accelerator: 'Cmd+,',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.send('open-route-name', 'settings');
                }
            },
            {
                label: 'Account Settings...',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.send('open-route-name', 'accountSettings');
                }
            },
            {type: 'separator'},
            {role: 'services', submenu: []},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
        ]
    });

    // Edit menu
    template[2].submenu.push(
        {type: 'separator'},
        {
            label: 'Speech',
            submenu: [
                {role: 'startspeaking'},
                {role: 'stopspeaking'}
            ]
        }
    );

    // Window menu
    template[4].submenu = [
        {role: 'minimize'},
        {role: 'zoom'},
        {type: 'separator'},
        {role: 'front'}
    ];
}
else {
    // Edit menu
    template[1].submenu.push(
        {type: 'separator'},
        {
            label: 'Preferences...',
            accelerator: 'Ctrl+,',
            click: (item, focusedWindow) => {
                focusedWindow.webContents.send('open-route-name', 'settings');
            }
        },
        {
            label: 'Account Settings...',
            click: (item, focusedWindow) => {
                focusedWindow.webContents.send('open-route-name', 'accountSettings');
            }
        }
    );


    // Help menu
    const helpMenu = template[4].submenu;
    template[4].submenu = [
        helpMenu[0],
        {
            label: `About ${config.app.name}`,
            click: (item, focusedWindow) => {
                focusedWindow.webContents.send('open-modal', 'about');
            }
        }
    ];
}

module.exports = template;
