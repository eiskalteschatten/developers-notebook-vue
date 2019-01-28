'use strict';

const TempApiAuth = require('../models/TempApiAuth');

module.exports = async () => {
    console.log('Starting cleanupDatabase cronjob');

    // Clean up invalid temp api auth keys
    TempApiAuth.destroy({ where: { validUntil: { $lt: new Date() } } });

    // TODO: Clean up associations

    console.log('Finished cleanupDatabase cronjob');
};
