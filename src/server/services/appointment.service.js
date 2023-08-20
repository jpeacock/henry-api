const BaseEntity = require("./base.entity.js");
const Sequelize = require("sequelize");
const modelTypes = require("../utils/modelDefinitionTypes.js");
module.exports = {
  name: "appointment",
  mixins: [BaseEntity],
  model: {
    name: "appointment",
    define: {
      id: modelTypes.primaryKey(),
      provider_id: modelTypes.integer(),
      client_id: modelTypes.integer(),
      is_confirmed: modelTypes.boolean(),
      timeslot_id: modelTypes.integer(),
      createdAt: modelTypes.noNull.date(),
      updatedAt: modelTypes.noNull.date(),
    },
  },
  actions: {
    getAllAppointments:{
      async handler() {
        const query = { is_confirmed: false };
        const appointments = await this.adapter.find({ query });
        return appointments.map((record) => record);
      }
    },
    getAppointmentByClientId:{
      async handler(ctx) {
        const id = ctx.params.id;
        const query = { client_id:id };
        const appointment = await this.adapter.find({ query });
        return appointment.map((record) => record);
      }
    },
    reserveAppointment:{
      async handler(ctx) {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1);
        const timeslot = await this.broker.call("timeslot.getTimeSlotById", { id: ctx.params.timeslot_id });
        const timeStart = new Date(timeslot[0].dataValues.timeStart);
        var hours = Math.abs(timeStart - today) / 36e5;
        
        if (hours < 24) return "Cannot make an appointment less than 24 hours in advance";

        const {
          provider_id, 
          client_id,
          is_confirmed=false, 
          timeslot_id,
          createdAt=today, 
          updatedAt=today, 
        } = ctx.params;

        const appointment = await this.adapter.insert({
          provider_id, 
          client_id, 
          is_confirmed, 
          timeslot_id,
          createdAt, 
          updatedAt 
        })

        const res = await this.broker.call("timeslot.updateTimeSlot", { id: timeslot_id, is_held: true, is_held_until: new Date().toUTCString() });
        
        return appointment;
      }
    },
    confirmAppointment: {
      async handler(ctx) {
        const id = ctx.params.id;
        let appointment = await this.adapter.findOne({
          where: { id },
        });
        let updated = {...appointment.dataValues, ...ctx.params}
        const appt = await appointment.update(updated, { where: { id } });
        const res = await this.broker.call("timeslot.updateTimeSlot", { id: appt.timeslot_id, is_confirmed: true, is_held: false, is_held_until: null });
        return updated;
      }
    },
    releaseAppointment: {
      async handler(ctx) {
        const id = ctx.params.id;
        let appt = await this.adapter.findOne({
          where: { id },
        });
        if (appt) {
          const res = await this.broker.call("timeslot.updateTimeSlot", { id: appt.timeslot_id, is_confirmed: false, is_held: false });
          return await appt.destroy();
        }
        return false;
      }
    },
  },
};
