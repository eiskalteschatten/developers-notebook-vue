'use strict';

// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const fs = require('fs');

const config = require('./config/config');
const appConfig = config.app;
const appMenu = require('./menus/app');

const windowSettingsPath = path.join(appConfig.storagePath, appConfig.windowSettingsFile);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

async function createWindow() {
    if (process.env.NODE_ENV !== 'production') {
        require('vue-devtools').install();
    }

    fs.readFile(windowSettingsPath, 'utf8', async (error, data) => {
        if (error) {
            return console.error(error);
        }

        try {
            const windowSettings = typeof data === 'object' ? JSON.parse(data) : {};

            const browserWindow = {
                webPreferences: {
                    nodeIntegration: true
                },
                width: windowSettings.width,
                height: windowSettings.height,
                icon: path.join(__dirname, './assets/images/icon128.png')
            };

            if (process.platform === 'darwin') {
                browserWindow['titleBarStyle'] = 'hidden';
            }

            if (windowSettings.x !== 0) {
                browserWindow['x'] = windowSettings.x;
            }

            if (windowSettings.y !== 0) {
                browserWindow['y'] = windowSettings.y;
            }

            mainWindow = new BrowserWindow(browserWindow);
            mainWindow.loadFile(`${config.app.frontendPaths.public}/electron.html`);

            if (windowSettings.isMaximized) {
                mainWindow.maximize();
            }

            mainWindow.setFullScreen(windowSettings.isFullScreen || false);

            // Open the DevTools.
            // mainWindow.webContents.openDevTools();

            mainWindow.on('close', () => {
                const windowBounds = mainWindow.getBounds();

                const windowSettings = {
                    width: windowBounds.width,
                    height: windowBounds.height,
                    x: windowBounds.x,
                    y: windowBounds.y,
                    isMaximized: mainWindow.isMaximized(),
                    isFullScreen: mainWindow.isFullScreen(),
                };

                fs.writeFile(windowSettingsPath, JSON.stringify(windowSettings), error => {
                    if (error) {
                        console.error(error);
                    }
                });
            });


            mainWindow.on('closed', () => {
                mainWindow = null;
            });

            const menu = Menu.buildFromTemplate(appMenu);
            Menu.setApplicationMenu(menu);
        }
        catch(error) {
            console.error(error);
        }
    });
}

app.setName(appConfig.name);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

if (!fs.existsSync(windowSettingsPath)) {
    const defaultWindowSettingsPath = path.resolve('src', 'config', 'windowSettings.json');
    fs.createReadStream(defaultWindowSettingsPath).pipe(fs.createWriteStream(windowSettingsPath));
}

// Events
require('./events/main/main');
require('./events/main/menus');
