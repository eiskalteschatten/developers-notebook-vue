'use strict';

const config = require('config');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// const tempToken = require('../lib/authentication/tempToken');

module.exports = router => {
    router.post('/login', async (req, res, next) => {
        try {
            // await tempToken.checkIfTokenIsValid(req.body.authToken);
            passport.authenticate('local-login', { session: false }, (error, user) => {
                if (error) {
                    console.error(new Error(error));
                    return res.status(400).json({
                        message: error,
                        type: 'error',
                        user
                    });
                }

                req.login(user, { session: false }, error => {
                    if (error || !user) {
                        if (error) {
                            console.error(new Error(error));
                        }

                        return res.status(400).json({
                            message: error,
                            type: 'error',
                            user
                        });
                    }

                    const token = jwt.sign(user.get(), config.get('jwt.secret'));
                    return res.json({ user, token });
                });
            })(req, res, next);
        }
        catch(error) {
            if (error != 401) {
                console.error(new Error(error));
                return res.status(500).json({
                    message: error,
                    type: 'error',
                    user
                });
            }
        }
    });

    router.get('/logout', req => {
        req.logout();
    });
};
