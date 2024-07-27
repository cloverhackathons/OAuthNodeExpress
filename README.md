# OAuthNodeExpress

## Requirements

- npm 6.4.1
- axios 0.18.0
- express 4.16.4
- nodemon 1.18.4
- [Sandbox Clover developer account](https://sandbox.dev.clover.com/developers)

## Set Up

Follow these [instructions](https://docs.clover.com/build/web-apps/) for creating a Clover web app and installing it to your sandbox test merchant. When creating the app, select the [permissions](https://docs.clover.com/build/permissions/) you want the OAuth token to have.

- On the app's **Settings** page, note _App ID_ and _App Secret_. Set them as `appID` and `appSECRET` at the top of `index.js`.
- Under **Web Configuration**, set _Site URL_ and _CORS Domain_ to `http://localhost:5000`.

### OAuth Version 1 and Version 2 Endpoints

- The application exposes two versions of the API:
  - **V1**: [http://localhost:5000](http://localhost:5000)
  - **V2**: [http://localhost:5000/v2](http://localhost:5000/v2) (OAuth 2.0 required)

Run:

- `npm install`
- `npm run server`

In your web browser, visit:

- [http://localhost:5000](http://localhost:5000) to access V1
- [http://localhost:5000/v2](http://localhost:5000/v2) to access V2

**Note**: The Clover v2 OAuth flow is only available in North America.
