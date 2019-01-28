'use strict';

const express = require('express');
const enrouten = require('express-enrouten');

const compression = require('compression');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const {setupSequelize} = require('./lib/db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const flash = require('connect-flash');

// const proxies = require('./lib/proxies');
// const {cmdMigrate} = require('./lib/dbMigrate');

const passport = require('passport');
const path = require('path');

const config = require('config');
const translations = config.get('translations');

const {setupErrorHandling} = require('./lib/errorHandling');

const setupCronjobs = require('./cronjobs');


module.exports = async () => {
    let app = express();
    const db = await setupSequelize();
    // cmdMigrate();

    // Express setup
    app.use(logger('dev'));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.disable('x-powered-by');


    // Session setup
    const sequelizeStore = new SequelizeStore({ db });
    app.use(session({
        secret: 'f1h5t6r4n564894e5845n6h5556H%$H%$htr644§"/&145htr4n5',
        saveUninitialized: false,
        resave: false,
        store: sequelizeStore,
        proxy: true
    }));
    sequelizeStore.sync();
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());


    // Setup Passport authentication
    require('./lib/authentication/setupPassport')();

    app.use(/^((?!login|dist|images|favicon).)*$/, (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/auth/login');
    });


    // Add the user's preferred language to the request
    app.use((req, res, next) => {
        const preferedLanguage = req.cookies.preferedLanguage;
        let language;

        if (preferedLanguage) {
            language = preferedLanguage;
        }
        else {
            language = req.headers['accept-language'] || 'en';

            if (language.indexOf(',') > -1) {
                language = language.split(',')[0];
            }

            if (language.indexOf('-') > -1) {
                language = language.split('-')[0];
            }
        }

        req.preferedLanguage = translations.includes(language) ? language : 'en';
        next();
    });


    // Setup frontend
    app.use(express.static(path.join(__dirname, '..', 'node_modules', 'developers-notebook-frontend', 'public')));


    // Setup routes
    // app = proxies(express, app);
    app.use(enrouten({
        directory: 'controllers'
    }));


    // Error handlers
    app = setupErrorHandling(app);


    console.log('App started with:');
    console.log('- Node.js', process.version);
    console.log(`- Started with NODE_ENV=${app.get('env')}`);

    setupCronjobs();

    return app;
};
