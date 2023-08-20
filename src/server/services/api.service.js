const routeAliases = () => ({
  "GET version":'api.version',
  "GET timeslot/all": "timeslot.getAllAvailableTimeslots",
  "GET timeslot/:id": "timeslot.getTimeSlotById",
  "POST timeslot": "timeslot.createTimeSlot",
  "PUT timeslot/:id": "timeslot.updateTimeSlot",
  "DELETE timeslot/:id": "timeslot.deleteTimeSlot",
  
  "GET appointment/all": "appointment.getAllAppointments",
  "GET appointment/:id": "appointment.getAppointmentByClientId",
  "POST appointment": "appointment.reserveAppointment",
  "PUT appointment/:id": "appointment.confirmAppointment",
  "DELETE appointment/:id": "appointment.releaseAppointment",

  "GET provider/all": "provider.getAllProviders",
  "GET provider/:id": "provider.getProviderById",
});
const ApiGateway = require("moleculer-web");

module.exports = {
  name: "api",
  version: "v1",
  mixins: [ApiGateway],
  settings: {
    // Global CORS settings for all routes
    cors: {
      // Configures the Access-Control-Allow-Origin CORS header.
      origin: "*",
      // Configures the Access-Control-Allow-Methods CORS header.
      methods: ["GET", "POST", "PUT", "DELETE"],
      // Configures the Access-Control-Allow-Headers CORS header.
      allowedHeaders: "*",
      // Configures the Access-Control-Expose-Headers CORS header.
      exposedHeaders: [],
      // Configures the Access-Control-Allow-Credentials CORS header.
      credentials: false,
      // Configures the Access-Control-Max-Age CORS header.
      maxAge: 3600,
    },
    routes: [
      {
        bodyParsers: {
          json: true,
          text: true,
        },
        onError(req, res, err) {
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.writeHead(500);
          res.end(JSON.stringify(err));
        },
        path: "/api",
        aliases: {
          mappingPolicy: "restrict",
          ...routeAliases(),
        },
      },
    ],
  },
  actions: {
    async version(ctx){
      return process.env.npm_package_version;
    }
  }
};
