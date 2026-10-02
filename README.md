# Student Management with Mongoose

A command-line teaching example with two related models, Course and Student. One course can have many students. Run it once against a fresh practice database.

## Setup

1. Install Node.js 20.19 or newer and create a MongoDB Atlas cluster.
2. In Atlas, create a database user and allow your current IP under Network Access. Copy the Drivers connection string.
3. Run `npm install` from this folder.
4. Copy `.env.example` to `.env`. Replace USER, PASSWORD, CLUSTER and YOUR_ROLL_NO. URL-encode any reserved characters in the password. Never commit `.env`.
5. Run `npm start`.

The database is named `practice_students_<ROLL_NO>`. Existing course names or student IDs will cause duplicate-key errors on a second run. For another complete run, use a new, empty roll number database. This example creates five students, then deletes S05; four remain.

## Files

- `src/app.js`: starts the demonstration and closes the connection.
- `src/config/database.js`: connects to the selected Atlas database.
- `src/models/course.model.js`: course fields and allowed names.
- `src/models/student.model.js`: student validation and the Course reference.
- `src/services/student.service.js`: validation example and create, read, update, delete operations.

The supplied source task prescribes one model. This teaching adaptation uses two models to demonstrate a relationship. Refer to the accompanying guide for an explanation of each operation.
