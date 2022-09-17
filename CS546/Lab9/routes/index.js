const showRoutes = require('./search');

const constructorMethod = (app) => {
    app.use('/', showRoutes);
    app.use('*', (req, res) => {
        res.status(404).json("Does not exist")
    });
};

module.exports = constructorMethod;