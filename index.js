const express = require('express');
const axios = require('axios');

// Config Set Up

// const targetEnv = 'https://sandbox.dev.clover.com'; // Pointing to Sandbox Environment
// const targetEnv = 'https://www.clover.com'; // Pointing to Prod Environment

const appID = 'PCE9V99BGBW0G'; // Input your app ID here
const appSecret = 'be6cbf95-0cb0-7932-9662-5bfda6f0dc30'; // Input your app secret here
const targetEnv = 'https://www.eu.clover.com'; // Pointing to EU Environment

// Initialize Express
const app = express();

// Root Route
app.get('/', (req, res) => authenticate(req, res));

// Steps 1 & 2 - Request merchant authorization to receive authorization code
const authenticate = async (req, res) => {
  const url = `${targetEnv}/oauth/authorize?client_id=${appID}`;

  /* If there is no code parameter in the query string of the current url
  redirect user for authentication. If there isn't then request API token */
  !req.query.code ? await res.redirect(url) : await requestAPIToken(res, req.query)
}

// Steps 3 & 4 - Request and serve up API token using the received authorization code
const requestAPIToken = async (res, query) => {
  const url = `${targetEnv}/oauth/token?client_id=${appID}&client_secret=${appSecret}&code=${query.code}`

  // Request
  await axios.get(url)
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
}

// Dynamic Port Binding
const port = process.env.port || 5000
app.listen(port);
