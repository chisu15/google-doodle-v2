const express = require('express');
const homeRoutes = require('./home.route');
const doodleRoute = require('./doodle.route');
const bodyParser = require('body-parser');

module.exports = (app) =>
{
    app.use(bodyParser.json())
    app.use("/", homeRoutes);
    app.use("/doodle", doodleRoute);
}