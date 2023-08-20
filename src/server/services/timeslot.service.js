const BaseEntity = require("./base.entity.js");
const Sequelize = require("sequelize");
const modelTypes = require("../utils/modelDefinitionTypes.js");
module.exports = {
  name: "timeslot",
  mixins: [BaseEntity],
  model: {
    name: "timeslot",
    define: {
      id: modelTypes.primaryKey(),
      client_id: modelTypes.integer(),
      is_confirmed: modelTypes.boolean(),
      is_held: modelTypes.boolean(),
      is_held_until: modelTypes.date(),
      timeStart: modelTypes.noNull.date(),
      timeEnd: modelTypes.noNull.date(),
      createdAt: modelTypes.noNull.date(),
      updatedAt: modelTypes.noNull.date(),
    },
  },
  actions: {
    getAllAvailableTimeslots:{
      async handler() {
        const query = { is_confirmed: false, is_held: false  };
        const timeslots = await this.adapter.find({ query });
        return timeslots.map((record) => record);
      }
    },
    getTimeSlotById:{
      async handler(ctx) {
        const id = ctx.params.id;
        const query = { id };
        const timeslot = await this.adapter.find({ query });
        return timeslot.map((record) => record);
      }
    },
    createTimeSlot:{
      async handler(ctx) {
        var today = new Date();
        
        const {
          is_confirmed, 
          is_held,
          timeStart, 
          timeEnd,
          createdAt=today, 
          updatedAt=today, 
        } = ctx.params;

        const timeslot = await this.adapter.insert({
          is_confirmed,
          is_held,
          timeStart,
          timeEnd,
          createdAt, 
          updatedAt 
        })

        return timeslot;
      }
    },
    updateTimeSlot: {
      async handler(ctx) {
        const id = ctx.params.id;
        let timeslot = await this.adapter.findOne({
          where: { id },
        });
        console.log(ctx.params)
        let updated = {...timeslot.dataValues, ...ctx.params}
        return await timeslot.update(updated, { where: { id } });
      }
    },
    deleteTimeSlot: {
      async handler(ctx) {
        const id = ctx.params.id;
        let timeslot = await this.adapter.findOne({
          where: { id },
        });
        if (timeslot) {
          return await timeslot.destroy();
        }
        return false;
      }
    },
  },
};
