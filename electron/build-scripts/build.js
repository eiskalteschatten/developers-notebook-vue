'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');

const config = require('../src/config/config');
const frontendPaths = config.app.frontendPaths;

if (process.env.NODE_ENV === 'development' && !fs.existsSync(frontendPaths.public)) {
    mkdirp(frontendPaths.module, error => {
        if (error) {
            console.error(error);
        }

        fs.symlink(frontendPaths.project, frontendPaths.public, error => {
            if (error) {
                console.error(error);
            }
        });
    });
}
