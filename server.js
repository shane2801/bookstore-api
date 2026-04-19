// import './config/env.js';   //load env FIRST
// import http from 'http';
// import app from './app.js';


// console.log('PORT', process.env.PORT);
// // set port to env variable value or default to 3000 if .env not found
// const port = process.env.PORT || 3000;

// const server = http.createServer(app);
// server.listen(port);
// console.log('Hello from server.js', process.env.DB_USER);


import { start } from './start.js';

start();