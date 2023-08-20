const BaseEntity = require("./base.entity.js");
const Sequelize = require("sequelize");
const modelTypes = require("../utils/modelDefinitionTypes.js");
module.exports = {
  name: "client",
  mixins: [BaseEntity],
  model: {
    name: "client",
    define: {
      id: modelTypes.primaryKey(),
      name: modelTypes.string(),
      createdAt: modelTypes.noNull.date(),
      updatedAt: modelTypes.noNull.date(),
    },
  },
  actions: {
    getAllClients:{
      async handler() {
        const providers = await this.adapter.find();
        return providers.map((record) => record);
      }
    },
    getClientById:{
      async handler(ctx) {
        const id = ctx.params.id;
        const query = { id };
        const provider = await this.adapter.find({ query });
        return provider.map((record) => record);
      }
    },
  },
};
