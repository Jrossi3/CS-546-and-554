const help = require('./userApi');

const constructorMethod = (app) => {
  app.use('/', help);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;