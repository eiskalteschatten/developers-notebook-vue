'use strict';

// const path = require('path');


module.exports = {
    proxies: {
        // '/js/libs/vue.js': path.join(__dirname, '../../node_modules/vue/dist/vue.runtime.min.js')
    },
    defaultUser: {
        firstName: 'Alex',
        lastName: 'Seifert',
        username: 'alexseifert',
        password: 'alexseifert',
        emailAddress: 'alex@alexseifert.com',
        roles: ['admin', 'user']
    },
    translations: ['en', 'de']
};
