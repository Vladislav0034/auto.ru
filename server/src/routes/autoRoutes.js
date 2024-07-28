const autoRouter = require('express').Router();
const { Auto, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');


autoRouter.route('/').get(async (req, res) => {
    try {
      const allAuto = await Auto.findAll();
      res.json(allAuto);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  });

   /* autoRouter.route('/')
  .post(async (req, res) => {
    try {
      const { modelCar, yearCar, mileage, cost, description, userId,  image } = req.body;
      // Создание нового задания
      const post = await Auto.create({
        modelCar: modelCar, 
        description: description,
        userId: userId, // Пользователь ID теперь берется из тела запроса
        yearCar: yearCar,
        mileage: mileage,
        cost: cost,
        image: image, 
        
      });
      // Поиск снова для получения сопутствующих данных о пользователе
      const plainX = await Auto.findOne({
        where: { id: post.id },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });
      res.json(plainX);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });  //добавление не авторизированый пользователь

  autoRouter.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    if (Number.isNaN(+id)) {
      return res.status(400).json({ message: 'Id must be a number' });
    }
  
    try {
      const auto = await Auto.findByPk(id);
      if (!auto) {
        return res.status(404).json({ message: 'Task not found' });
      }
      await auto.destroy();
      res.json({ message: 'Task deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }); //удаление не авторизированного пользователя

  autoRouter.route('/:id').patch(async (req, res) => {
    const { id } = req.params;
    const { modelCar, yearCar, mileage, cost, description, image } = req.body;
  
    if (Number.isNaN(+id)) {
      return res.status(400).json({ message: 'Id must be a number' });
    }
  
    try {
      const auto = await Auto.findByPk(id);
      if (!auto) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Обновление записи с новыми данными
      auto.modelCar = modelCar ?? auto.modelCar;
      auto.yearCar = yearCar ?? auto.yearCar;
      auto.mileage = mileage ?? auto.mileage;
      auto.cost = cost ?? auto.cost;
      auto.description = description ?? auto.description;
      auto.image = image ?? auto.image;
  
      await auto.save();
      res.json(auto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });  */ //редактирование не авторизированного пользователя 

  /* autoRouter
.route('/')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const auto = await Auto.findAll({
        where: { userId },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });
      res.json(auto);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const post = await Auto.create({
        modelCar: req.body.modelCar,  
        description: req.body.description,
        userId: res.locals.user.id, // Пользователь ID теперь берется из тела запроса
        yearCar: req.body.yearCar,
        mileage: req.body.mileage,
        cost: req.body.cost,
        image: req.body.image, 
      });
      const plainX = await Auto.findOne({
        where: {
          id: post.id,
        },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });

      res.json(plainX);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }); */

  autoRouter
  .route('/')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const auto = await Auto.findAll({
        where: { userId },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });
      res.json(auto);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const userId = res.locals.user.id;

      // Проверяем количество постов, принадлежащих пользователю
      const userPostsCount = await Auto.count({
        where: { userId }
      });

      if (userPostsCount >= 3) {
        return res.status(403).json({ error: 'User can only have up to 3 posts.' });
      }

      const post = await Auto.create({
        modelCar: req.body.modelCar,
        description: req.body.description,
        userId,
        yearCar: req.body.yearCar,
        mileage: req.body.mileage,
        cost: req.body.cost,
        image: req.body.image,
      });

      const plainX = await Auto.findOne({
        where: {
          id: post.id,
        },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });

      res.json(plainX);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

module.exports = autoRouter;



  autoRouter.route('/:id').delete(verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    if (Number.isNaN(+id)) {
      return res.status(400).json({ message: 'Id must be a number' });
    }
  
    try {
      const autoDelete = await Auto.findByPk(req.params.id);
      if (!autoDelete) {
        return res.status(404).json({ message: 'X not found' });
      }
      if (autoDelete.userId !== res.locals.user.id && res.locals.user.id !== 2) {
        return res.status(401).json({ message: 'Unable to complete' });
      }
      await autoDelete.destroy();
      res.json({ message: 'X deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  autoRouter.route('/:id').patch(verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    const { modelCar, yearCar, mileage, cost, description, image } = req.body;
  
    if (Number.isNaN(+id)) {
      return res.status(400).json({ message: 'Id must be a number' });
    }
    try {
      const post = await Auto.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: 'Task not found' });
      }
      if (post.userId !== res.locals.user.id && res.locals.user.id !== 2) {
        return res.status(401).json({ message: 'Unable to complete' });
      }
      // Обновление записи с новыми данными
      post.modelCar = modelCar ?? post.modelCar;
      post.yearCar = yearCar ?? post.yearCar;
      post.mileage = mileage ?? post.mileage;
      post.cost = cost ?? post.cost;
      post.description = description ?? post.description;
      post.image = image ?? post.image;
      
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }); 
  

module.exports = autoRouter;