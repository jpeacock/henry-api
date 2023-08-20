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

    var startTime = "2023-08-22 08:00:00"
    var endTime = "2023-08-22 15:00:00"

    var parseIn = function(date_time){
        var d = new Date(date_time);
      d.setHours(date_time.substring(11,13));
        d.setMinutes(date_time.substring(14,16));
      return d;
    }

    var getTimeIntervals = function (time1, time2) {
        var arr = [];
      while(time1 < time2){
        arr.push(time1.toUTCString());
        time1.setMinutes(time1.getMinutes() + 15);
      }
      return arr;
    }

    startTime = parseIn(startTime);
    endTime = parseIn(endTime);

    var intervals = getTimeIntervals(startTime, endTime);

    let mock_data = [];
    
    intervals.forEach(interval => {
      let end = new Date(interval).setMinutes(new Date(interval).getMinutes() + 14);
      end = new Date(end).toUTCString();
      mock_data.push({
        is_confirmed: false,
        is_held: false,
        timeStart: interval,
        timeEnd: end,
        ...date,
      })
    });

    await queryInterface.bulkInsert(
      "timeslot",
      mock_data,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Commands to revert seed.
     */
    await queryInterface.bulkDelete("timeslot", null, {});
  },
};
