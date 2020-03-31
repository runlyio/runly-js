# Runly.js

> Javascript components to connect to Runly

This repository is monorepo for all of the JS component libraries that connect to runly. It currently contains:

* [`core`](./core): Core components to connect to Runly
* [`react-bootstrap`](./react-bootstrap): Bootstrap-styled react components to connect to Runly
* [`cdn`](./cdn): Prebuilt CDN script that can be dropped on a page to include Runly components
* [`example`](./example): Example Gatsby app that incorporates each set of Runly components

[Read the documentation](https://www.runly.io/docs/integration/runly-js/) to learn how to integrate runly.js into your application.

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
