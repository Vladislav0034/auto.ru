'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
      name: 'Том Круз',
      email: "Tom@mail.ru",
      password: await bcrypt.hash('123', 10),
      },
      {
        name: 'Владислав Песков',
        email: "xfemidax@mail.ru",
        password: await bcrypt.hash('123', 10),
        }
    ], {});
    await queryInterface.bulkInsert(
      'Autos', [
        {
          userId: 1,
          modelCar: 'BMW 320',
          yearCar: '2020',
          mileage: '32500  km',
          cost: '3500000 рублей',
          description: 'Машине 1 год продаю не срочно, ездил аккуратно, не хасанил ',
          image: 'https://avatars.mds.yandex.net/i?id=6db70d792a3e9c752c956766a0abf7f9112ff062-4809555-images-thumbs&n=13',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          modelCar: 'BMW 520',
          yearCar: '2020',
          mileage: '33500  km',
          cost: '4500000 рублей',
          description: 'Машине 1 год продаю не срочно, ездил аккуратно, не хасанил никогда',
          image: 'https://avatars.mds.yandex.net/i?id=459f4125d4ff364c60b8c175ff6119acdba07639-10384982-images-thumbs&n=13',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
