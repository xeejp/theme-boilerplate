import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createAction } from 'redux-actions'
import reduceReducers from 'reduce-reducers'
import { createJsondiffpatch } from 'jsondiffpatch'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default function startApp(component, reducer, saga) {
  const patch = createAction('@@boilerplate/patch', diff => diff)

  const jsondiffpatch = createJsondiffpatch({})
  const patcher = handleAction(patch, (state, { payload: diff }) => {
    return jsondiffpatch.patch(state, diff)
  })

  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware()

  let middlewares = [sagaMiddleware, logger]

  const store = createStore(
    reduceReducers(reducer, patcher),
    applyMiddleware(...middlewares)
  )

  sagaMiddleware.run(saga)

  var _experiment = new Experiment(_topic, _token);

  _experiment.onReceiveMessage(({ action, diff }) => {
    store.dispatch(action)
    store.dispatch(patch(diff))
  })

  function sendData(action, params=null) {
    _experiment.send_data({ action, params });
  }

  window.sendData = sendData

  render(
    <Provider store={store}>
      <component />
    </Provider>,
    document.getElementById("content")
  )
}
