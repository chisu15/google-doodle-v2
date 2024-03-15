const express = require('express');
const homeRoutes = require('./home.route');
const doodleRoute = require('./doodle.route');
const userRoute = require('./user.route');

module.exports = (app) =>
{
    const version = "/api/v1"
    app.use(version, homeRoutes);
    app.use(version + "/doodle", doodleRoute);
    app.use(version + "/users", userRoute)
}