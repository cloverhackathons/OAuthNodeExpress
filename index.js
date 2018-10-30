const express = require('express');
const axios = require('axios');

// Config Set Up
const appID = ''; // Input your app ID here
const appSecret = ''; // Input your app secret here
const targetEnv = 'https://sandbox.dev.clover.com'; // Pointing to Sandbox Environment

// Initialize Express
const app = express();

// Root Route
app.get('/', (req, res) => authenticate(req, res));

// Steps 1 & 2 - Request merchant authorization to receive authorization code
const authenticate = (req, res) => {
  const url = `${targetEnv}/oauth/authorize?client_id=${appID}`;

  /* If there is no code parameter in the query string of the current url
  redirect user for authentication. If there isn't then request API token */
  !req.query.code ? res.redirect(url) : requestAPIToken(res, req.query)
}

// Steps 3 & 4 - Request and serve up API token using the received authorization code
const requestAPIToken = (res, query) => {
  const url = `${targetEnv}/oauth/token?client_id=${appID}&client_secret=${appSecret}&code=${query.code}`

  // Request
  axios.get(url)
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
}

// Dynamic Port Binding
const port = process.env.port || 5000
app.listen(port);
