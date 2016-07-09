# experiment-boilerplate
React + Redux with Webpack

## Installation

1. `git clone https://github.com/xeejp/experiment-boilerplate.git ./your-application`
2. `npm install`
3. `npm run build:watch`
4. Start editing!

## Files

- `script.exs`  
The experiment script for your application.  
You must follow the Xee's experiment script API.  

- `(host|participant)/index.js`  
The entry point for clients.  
You may have to edit this file unless you don't change the structure of your application.  

- `(host|participant)/App.js(x?)`  
The root React component which will be rendered by default.  

- `(host|participant)/actions.js`  
The space to define Redux actions.  
See [Actions | Redux](http://redux.js.org/docs/basics/Reducers.html) for detail.  

- `(host|participant)/reducer.js`  
The reducer for your application's Redux store.  
See [Reducers | Redux](http://redux.js.org/docs/basics/Reducers.html) for detail.  

- `(host|participant)/saga.js`  
The saga to handle side effects of Redux actions.  
See [Read Me | redux-saga](http://yelouafi.github.io/redux-saga/index.html) for detail.  

## Commands

- `npm run build:dev` Build your application for development
- `npm run build:watch` Watch and build your application for development
- `npm run build:prod` Build your application for production
