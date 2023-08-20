const BaseEntity = require("./base.entity.js");
const Sequelize = require("sequelize");
const modelTypes = require("../utils/modelDefinitionTypes.js");
module.exports = {
  name: "provider",
  mixins: [BaseEntity],
  model: {
    name: "provider",
    define: {
      id: modelTypes.primaryKey(),
      name: modelTypes.string(),
      createdAt: modelTypes.noNull.date(),
      updatedAt: modelTypes.noNull.date(),
    },
  },
  actions: {
    getAllProviders:{
      async handler() {
        const providers = await this.adapter.find();
        return providers.map((record) => record);
      }
    },
    getProviderById:{
      async handler(ctx) {
        const id = ctx.params.id;
        const query = { id };
        const provider = await this.adapter.find({ query });
        return provider.map((record) => record);
      }
    },
  },
};
