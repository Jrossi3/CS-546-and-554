const searchRoutes = require('./search');
const showRoutes = require('./show');
const path = require('path');

const constructorMethod = (app) => {
    app.use('/searchshows', searchRoutes);
    app.use('/', showRoutes);
    app.use('*', (req, res) => {
        res.status(404).render("posts/error", {error2: "We're sorry, but no results were found for that id"});
    });
};

module.exports = constructorMethod;