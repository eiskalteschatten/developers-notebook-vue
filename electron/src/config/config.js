'use strict';

const path = require('path');
const os = require('os');
const fs = require('fs');

let storagePath;

switch(process.platform) {
    case 'darwin':
        storagePath = path.join(os.homedir(), 'Library', 'Application Support', 'DevelopersNotebook');
        break;
    case 'win32':
        storagePath = path.join(os.homedir(), 'AppData', 'Roaming', 'Alex Seifert', 'DevelopersNotebook');
        break;
    default:
        storagePath = path.join(os.homedir(), '.devnotebook');
        break;
}

if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
}

console.log('Application data is saved at:', storagePath);

module.exports = {
    app: {
        name: 'Developer\'s Notebook',
        version: '0.2.0',
        storagePath,
        windowSettingsFile: 'windowSettings.json',
        frontendPaths: {
            project: path.join(__dirname, '..', '..', '..', 'frontend', 'public'),
            module: path.join(__dirname, '..', '..', 'node_modules', 'developers-notebook-frontend'),
            public: path.join(__dirname, '..', '..', 'node_modules', 'developers-notebook-frontend', 'public')
        }
    },
    updates: {
        url: 'https://www.alexseifert.com/devnotebook/api/check-for-updates/'
    }
};
