'use strict';

const passport = require('passport');
// const tempToken = require('../lib/authentication/tempToken');

module.exports = router => {
    router.post('/login', async (req, res, next) => {
        try {
            // await tempToken.checkIfTokenIsValid(req.body.authToken);
            passport.authenticate('local-login', (error, user) => {
                if (error) {
                    console.error(new Error(error));
                    return next(error);
                }

                req.logIn(user, error => {
                    if (error) {
                        console.error(new Error(error));
                        return next(error);
                    }

                    return res.redirect('/');
                });
            })(req, res, next);
        }
        catch(error) {
            if (error != 401) {
                console.error(new Error(error));
            }

            req.flash('loginMessage', 'An error occurred');
            res.redirect('/auth/login');
        }
    });

    router.get('/logout', (req, res) => {
        req.session.currentWebsite = null;
        req.logout();
        res.redirect('/auth/login');
    });
};
