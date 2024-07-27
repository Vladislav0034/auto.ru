const autoRouter = require('express').Router();
const { Auto, User } = require('../../db/models');


autoRouter.route('/').get(async (req, res) => {
    try {
      const allAuto = await Auto.findAll();
      res.json(allAuto);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  });


module.exports = autoRouter;