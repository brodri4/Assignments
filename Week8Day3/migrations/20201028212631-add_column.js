'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('blogs','isPublished', {type:Sequelize.BOOLEAN}
    )
},

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('blogs', isPublished)
  }
};
