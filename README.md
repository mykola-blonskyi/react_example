## Install

[Node.js](https://nodejs.org) required.

Install npm dependencies:

```console
npm install
```

## Configure

This app uses environment variables to manage configs. It will also load params from `.env` file if it exists (see `.env-example`).

## Development

To start app locally you will need to run two commands:

```console
npm run start:server
```

and:

```
npm run start:client
```


This will start server-side applications (on ports specified by `process.env.APP_HOST`,process.env.APP_PORT`) in development mode and `webpack-dev-server` for client part.

Now you can open app at specified port (by default 9000), http://localhost:9000
