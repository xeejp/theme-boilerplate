import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createAction, createReducer } from 'redux-act'
import reduceReducers from 'reduce-reducers'
import { create as createJsondiffpatch } from 'jsondiffpatch'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default function startApp(component, reducer, saga) {
  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware()

  let middlewares = [sagaMiddleware, logger]

  const patch = createAction('patch', diff => diff)
  const jsondiffpatch = createJsondiffpatch({})
  const patcher = createReducer({
    [patch]: (state, diff) => jsondiffpatch.patch(Object.assign({}, state), diff)
  })

  const store = createStore(
    reduceReducers(reducer, patcher),
    applyMiddleware(...middlewares)
  )

  sagaMiddleware.run(saga)

  var _experiment = new Experiment(_topic, _token);

  _experiment.onReceiveMessage(({ action, diff }) => {
    if (action) store.dispatch(action)
    if (diff) store.dispatch(patch(diff))
  })

  function sendData(action, params=null) {
    _experiment.send_data({ action, params });
  }

  window.sendData = sendData

  render(
    <Provider store={store}>
      {React.createElement(component)}
    </Provider>,
    document.getElementById("content")
  )
}
