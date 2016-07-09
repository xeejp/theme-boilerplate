# experiment-boilerplate
React + Redux with Webpack

### Files

#### script.exs
The experiment script for your application.  
You must follow the Xee's experiment scriptAPI.  

#### (host|participant)/index.js
The entry point for clients.  
You may have to edit this file unless you don't change the structure of your application.  

#### (host|participant)/App.js(x?)
The root React component which will be rendered by default.  

#### (host|participant)/actions.js
The space to define Redux actions.  
See [Actions | Redux](http://redux.js.org/docs/basics/Reducers.html) for detail.  

#### (host|participant)/reducer.js
The reducer for your application's Redux store.  
See [Reducers | Redux](http://redux.js.org/docs/basics/Reducers.html) for detail.  

#### (host|participant)/saga.js
The saga to handle side effects of Redux actions.  
See [Read Me | redux-saga](http://yelouafi.github.io/redux-saga/index.html) for detail.  
