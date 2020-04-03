# Runly.js

> Javascript components to connect to Runly

This repository is a monorepo for all of the JS component libraries that connect to runly. It currently contains:

* [`core`](./core): Core components to connect to Runly
* [`react-bootstrap`](./react-bootstrap): [Bootstrap](https://getbootstrap.com/)-styled react components to connect to Runly
* [`html`](./html): Prebuilt script that can be dropped on any HTML page to include Runly components
* [`example`](./example): Example [Gatsby](https://www.gatsbyjs.org/) app that incorporates each set of Runly components

[Learn how to integrate runly.js](https://www.runly.io/docs/integration/runly-js/) into your application.

## Running Locally

After cloning this repo, run the following in a terminal:

```
npm install
npm run bootstrap
```

This will install dependencies and link local dependencies together using [Lerna](https://github.com/lerna/lerna).

To lint the whole workspace:

```
npm run lint
```

### Run Example

To run the example app:

```
cd example
npm start
```

## Publishing

To publish all changed packages, run:

```
npx lerna publish
```

This will ask you for a major/minor/patch version bump for each changed package since the last release. It will then publish the changes to npm, tag the release, and push all the changes to the repo.
