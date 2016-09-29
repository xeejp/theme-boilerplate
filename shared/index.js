import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createAction, createReducer } from 'redux-act'
import throttle from 'react-throttle-render'

import reduceReducers from 'reduce-reducers'
import { create as createJsondiffpatch } from 'jsondiffpatch'
import clone from 'clone'
import { fork, take, call } from 'redux-saga/effects'


import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { openParticipantPage } from 'host/actions'

export default function startApp(component, reducer, saga, host=false) {
  const logger = createLogger()
  const sagaMiddleware = createSagaMiddleware()

  let middlewares = [sagaMiddleware, logger]

  const patch = createAction('patch', diff => diff)
  const jsondiffpatch = createJsondiffpatch({})
  const patcher = createReducer({
    [patch]: (state, diff) => jsondiffpatch.patch(clone(state), diff)
  })

  const store = createStore(
    reduceReducers(reducer, patcher),
    applyMiddleware(...middlewares)
  )

  if (host) {
    // Saga
    function* openParticipantPageSaga() {
      while (true) {
        const { payload: id } = yield take(`${openParticipantPage}`)
        yield call(_experiment.openParticipantPage.bind(_experiment), id)
      }
    }

    function* hostSaga() {
      yield fork(saga)
      yield fork(openParticipantPageSaga)
    }
    sagaMiddleware.run(hostSaga)
  } else {
    sagaMiddleware.run(saga)
  }

  var _experiment = new Experiment(_topic, _token);

  _experiment.onReceiveMessage(({ action, diff }) => {
    if (action) store.dispatch(action)
    if (diff) store.dispatch(patch(diff))
  })

  function sendData(action, params=null) {
    _experiment.send_data({ action, params });
  }

  window.sendData = sendData

  const ThrottledComponent = throttle(component, 50)
  render(
    <Provider store={store}>
      {React.createElement(ThrottledComponent)}
    </Provider>,
    document.getElementById("content")
  )
}
