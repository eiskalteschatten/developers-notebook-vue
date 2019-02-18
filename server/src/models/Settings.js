'use strict';

const Sequelize = require('sequelize');
const {db} = require('../lib/db');

const User = require('./User');

const Settings = db.define('settings', {
    theme: Sequelize.STRING
});

User.hasMany(Settings);
Settings.belongsTo(User);

Settings.sync();

module.exports = User;
