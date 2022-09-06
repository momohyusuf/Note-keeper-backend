// enables us to access to global variables in the dotenv file
require('dotenv').config();
// *********
// throws express errors when ever your make an error in express
require('express-async-errors');
// **************

// external libraries for extra security
// for cross site scripting attack
const xss = require('xss-clean');
// ***
// this is use to ensure that yours api resources can be access from any origin
const cors = require('cors');
// ***

//to secure our express app
const helmet = require('helmet');
// ***
// this is use to limit the amount or request that can be sent to our api within a specific time
const rateLimiter = require('express-rate-limit');
// ***

// Swagger ui and Yaml for Api documentation

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// *********************

// express library import
const express = require('express');
const app = express();
// ************
// import routes
const userProfileRoutes = require('./routes/user-profile');
const notesRoute = require('./routes/notes');
// *****************

// middleware errors import
const authenticateUser = require('./middlewares/authentication');
const generalErrorHandleMiddleware = require('./middlewares/errorHandler');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');

// database connection function
const connectDataBase = require('./database/connect');
// ****************

// this is to enable us get the the values from the request

// ************
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('<h1>Notes API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use('/api/v1/authorize', userProfileRoutes);
app.use('/api/v1/notes', authenticateUser, notesRoute);

// *********************
// error middleware
// helps to present more understandable errors
app.use(generalErrorHandleMiddleware);
// ******************
//handles wrong routing error
app.use(notFoundMiddleware);
//*************

// *********

// our port for listening to events on our server
const port = process.env.PORT || 3000;
// ***************
// connecting to database before starting the server
const start = async () => {
  try {
    await connectDataBase(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (error) {
    console.log(error);
  }
};
// *******************************
// starts server
start();
// ********************
