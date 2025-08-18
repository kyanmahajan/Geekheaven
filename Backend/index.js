const express = require('express');
const app = express();
const auth = require('./auth_middle.js')
const cors = require('cors');
const questionRoutes = require('./route.js');
const authroutes = require('./auth_routes.js')
app.use(cors());

const {connectDB} = require('./mongoose.js');
require('dotenv').config();
const mongoose = require('mongoose');

// app.use(express.static('./Public'));
app.use(express.json());

app.use('/api', auth,questionRoutes);
app.use('/auth/api',  authroutes);

// app.use('/api/v1/tasks', tasks);
const port = 3000;

const start = async () => {
    try {
      await connectDB(process.env.stringg);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  start();