'use strict';

const fs = require('fs');
const path = require('path');


module.exports = () => {
    return new Promise((resolve, reject) => {
        const projectPath = path.join(__dirname, '..', '..', 'frontend', 'public');
        const modulePath = path.join(__dirname, '..', 'node_modules', 'developers-notebook-frontend', 'public');

        if (app.get('env') !== 'development') {
            return resolve(modulePath);
        }

        fs.symlink(projectPath, modulePath, error => {
            if (error) {
                console.error(error);
                return reject(error);
            }

            resolve(modulePath);
        });
    });
};
