const editUserRouter = require('express').Router();
const { User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

editUserRouter.route('/:id').patch(verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  if (Number.isNaN(+id)) {
    return res.status(400).json({ message: 'Id must be a number' });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Проверка, что редактируемый пользователь совпадает с аутентифицированным пользователем
    if (user.id !== res.locals.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Обновление записи с новыми данными
    if (image) {
      user.image = image;
    }

    await user.save();

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = editUserRouter;