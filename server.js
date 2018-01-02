'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MeetupController =  require('./src/controllers/meetup');
const config = require('./config.js'); // remove .example from /server/config.js.example
//const MongoDBUrl = 'mongodb://localhost:27017/meetupapi';
const MongoDBUrl = 'mongodb://unicodeveloper:pote1142@ds235827.mlab.com:35827/meetup';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// @TODO: Remove .example from /server/config.js.example
// and update with your proper Auth0 information
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.CLIENT_DOMAIN}/.well-known/jwks.json`
    }),
    // This is the identifier we set when we created the API
    audience: config.AUTH0_AUDIENCE,
    issuer: `https://${config.CLIENT_DOMAIN}/`,
    algorithms: ['RS256']
});

app.post('/api/meetups', MeetupController.create);
app.get('/api/meetups/public', MeetupController.getPublicMeetups);
app.get('/api/meetups/private', authCheck, MeetupController.getPrivateMeetups);

app.listen(3333);
console.log('Listening on localhost:3333');
 // Once started, connect to Mongo through Mongoose
mongoose.connect(MongoDBUrl, {}).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
