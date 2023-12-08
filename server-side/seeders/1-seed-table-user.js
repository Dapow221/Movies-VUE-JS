'use strict';
const { hashPass } = require('../helpers/helper');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let user = require('../data/users.json').map(el => {
    // const salt = bcrypt.genSaltSync(10)
    // const hash = bcrypt.hashSync(el.password, salt)
    // el.password = hash
    const hash = hashPass(el.password)
        el.password = hash
    el.createdAt = el.updatedAt = new Date()
    return el
   })
   await queryInterface.bulkInsert('Users', user)
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
