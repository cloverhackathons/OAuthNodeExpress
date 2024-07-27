const express = require('express');
const axios = require('axios');
const session = require('express-session');

// Config Set Up
const targetEnv = 'https://sandbox.dev.clover.com'; // Pointing to Sandbox Environment
// const targetEnv = 'https://www.clover.com'; // Pointing to Prod Environment

const appID = ''; // Input your app ID here
const appSecret = ''; // Input your app secret here
const sessionSecret = 'your-super-secret-key'; // Input your session secret here

// Initialize Express
const app = express();

// Setup session middleware
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// Function to determine the version path from the URL
const getVersionPath = (req) => {
  return req.originalUrl.startsWith('/v2') ? '/v2/' : '/';
};

// Root Route
app.get('/', (req, res) => authenticate(req, res));

// v2 Route
app.get('/v2', (req, res) => authenticate(req, res));

// Steps 1 & 2 - Request merchant authorization to receive authorization code
const authenticate = async (req, res) => {
  const versionPath = getVersionPath(req);
  const url = `${targetEnv}/oauth${versionPath}authorize?client_id=${appID}`;

  // If there is no code parameter in the query string, redirect user for authentication
  if (!req.query.code) {
    // Store the version path in the session for future use
    req.session.versionPath = versionPath;
    return res.redirect(url); // Use return to ensure no further code execution after redirect
  } // If is code parameter in the query string, then request API token
  else {
    // Retrieve the version path from the session
    const versionPath = req.session.versionPath || versionPath;
    return requestAPIToken(res, req.query.code, versionPath);
  }
};

// Steps 3 & 4 - Request and serve up API token using the received authorization code
const requestAPIToken = async (res, code, versionPath) => {
  const url = `${targetEnv}/oauth${versionPath}token`;
  const data = {
    client_id: appID,
    client_secret: appSecret,
    code: code,
  };

  // Request
  await axios
    .post(url, data)
    .then(({ data }) => res.send(data))
    .catch((err) => res.send(err.message));
};

// Dynamic Port Binding
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(
    '🍀 Server is running. Access the application at the following URLs:'
  );
  console.log(`   - V1: http://localhost:${port}`);
  console.log(`   - V2: http://localhost:${port}/v2 (OAuth 2.0 required)`);
});
