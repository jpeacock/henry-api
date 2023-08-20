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
      "provider",
      [{
        name: "John Peacock",
        ...date,
      },
      {
        name: "Kim Johnston",
        ...date,
      },
      {
        name: "Daniel Harp",
        ...date,
      }],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Commands to revert seed.
     */
    await queryInterface.bulkDelete("provider", null, {});
  },
};
