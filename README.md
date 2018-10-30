# OAuthNodeExpress

## Requirements

* npm 6.4.1
* axios 0.18.0
* express 4.16.4
* nodemon 1.18.4
* [Sandbox Clover developer account](https://sandbox.dev.clover.com/developers)

## Set Up

Follow these [instructions](https://docs.clover.com/build/web-apps/) for creating a Clover web app and installing it to your sandbox test merchant. When creating the app, select the [permissions](https://docs.clover.com/build/permissions/) you want the OAuth token to have.

* On the app's **Settings** page, note _App ID_ and _App Secret_. Set them as `appID` and `appSECRET` at the top of index.js.
* Under **Web Configuration**, set _Site URL_ and _CORS Domain_ to `http://localhost:5000`.

Run:
* `npm install`
* `npm run server`

In your web browser, visit [http://localhost:5000/](http://localhost:5000/).
