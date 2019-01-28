'use strict';

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User');

const translations = {
    en: {
        incorrectUsernameOrPassword: 'Incorrect username or password.'
    },
    de: {
        incorrectUsernameOrPassword: 'Falscher Benutzername oder falsches Passwort.'
    }
};

const localConfig = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
};

module.exports = () => {
    passport.use('local-login', new LocalStrategy(localConfig, (req, username, password, done) => {
        process.nextTick(async () => {
            try {
                const user = await User.findOne({
                    where: {
                        username,
                        roles: { $contains: ['user'] }
                    }
                });

                if (! user || ! user.validPassword(password) || user.roles.includes('inactive')) {
                    return done(null, false, req.flash('loginMessage', translations[req.preferedLanguage].incorrectUsernameOrPassword));
                }

                return done(null, user);
            }
            catch(error) {
                console.error(error);
                done(error);
            }
        });
    }));

    // Uncomment when ready to add user registration
    // passport.use('local-register', new LocalStrategy(localConfig, (req, username, password, done) => {
    //     process.nextTick(() => {
    //         const body = req.body;

    //         User.findOne({ where: { username: username } }).then(user => {
    //             if (user) {
    //                 return done(null, false, req.flash('registerMessage', 'A user with this username already exists.'));
    //             }

    //             if (body.password !== body.repeatPassword) {
    //                 return done(null, false, req.flash('registerMessage', 'The passwords do not match.'));
    //             }

    //             const password = User.generateHash(body.password);

    //             return User.create({
    //                 firstName: body.firstName,
    //                 lastName: body.lastName,
    //                 username: body.username,
    //                 emailAddress: body.emailAddress,
    //                 password,
    //                 role: body.role
    //             });
    //         }).then(user => {
    //             return done(null, user);
    //         }).catch(error => {
    //             console.error(error);
    //             done(error);
    //         });
    //     });
    // }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            done(null, user);
        }).catch(error => {
            console.error(error);
        });
    });

    if (process.env.SETUP_DEFAULT_USER) {
        const config = require('config');
        const defaultUser = config.get('defaultUser');

        User.findOne({ where: { username: defaultUser.username } } ).then(user => {
            if (user) {
                console.error('You are trying to create a new default user, but one has already been setup!');
                return;
            }

            const password = User.generateHash(defaultUser.password);

            return User.create({
                firstName: defaultUser.firstName,
                lastName: defaultUser.lastName,
                username: defaultUser.username,
                emailAddress: defaultUser.emailAddress,
                password,
                roles: defaultUser.roles
            });
        }).then(user => {
            if (user) {
                console.log('Created new default user:', defaultUser);
            }
        }).catch(console.error);
    }
};
