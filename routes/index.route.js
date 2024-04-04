const express = require('express');
const homeRoute = require('./home.route');
const doodleRoute = require('./doodle.route');
const userRoute = require('./user.route');

module.exports = (app) =>
{
    const version = "/api/v1"
    app.use(version, homeRoute);
    app.use(version + "/doodle", doodleRoute);
    app.use(version + "/users", userRoute)
}