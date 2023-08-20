"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Seed command.
     */
    const date = {
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
    };

    await queryInterface.bulkInsert(
      "client",
      [{
        name: "Client Jane",
        ...date,
      },
      {
        name: "Client John",
        ...date,
      }],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Commands to revert seed.
     */
    await queryInterface.bulkDelete("client", null, {});
  },
};
