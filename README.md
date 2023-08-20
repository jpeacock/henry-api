# Getting Started with the scheduler app

## How to run the API server

- The project was built in Node.js
- Create an instance of a PostgreSQL database. If you have Docker installed, you could spin up an ephemeral instance of a Postgres container like so:

  ```
  docker-compose up -d
  ```

- Navigate to `src/server` and perform an `npm install`
- Seed the database with the available time slots by running `npx sequelize-cli db:seed:all` then start the API server using `npm run start`. This will create the table structure using Sequelize, if the db schema doesn't exist yet. There is also a REST method to create available time slots, but this was quicker and simpler for a demo.

To get all available timeslots:
GET: http://localhost:3000/api/timeslot/all

To get all confirmed appointments:
GET http://localhost:3000/api/appointment/all

To request an appointment too early:
POST: http://localhost:3000/api/appointment
```
{
	"status": true,
	"client_id": 1,
	"provider_id": 1,
	"timeslot_id": 3
}
```

To request an appointment for 30 minutes at least 24 hours in advance
POST: http://localhost:3000/api/appointment/
```
{
	"status": true,
	"client_id": 1,
	"provider_id": 1,
	"timeslot_id": 31
}
```

To confirm that appointment: 
PUT http://localhost:3000/api/appointment/1
```
{
	"is_confirmed": true
}
```

## Demo video
https://www.dropbox.com/scl/fi/5uwl3spw4uxp1jkyc0vf4/henry-demo.mp4?dl=0&rlkey=kbbn4l94tds871dh8tj10h6im

## Caveats
There are some obvious things that are missing, such as
- No user auth. On the API side, there's an easy way to add an auth middleware in `api.service.js` in the routes. 
- Some error handling is a bit wonky, but would be ironed out if I had more time. 
- There's no env config used. I hard coded values for my local PostgreSQL instance, but in a real world scenario these would be out of the repo. 
