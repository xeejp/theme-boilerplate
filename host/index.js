import { fork, take, call } from 'redux-saga/effects'

import App from './App.js'
import saga from './saga'
import reducer from './reducer'
import { openParticipantPage } from './actions'

import startApp from 'shared/index.js'

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

startApp(App, reducer, hostSaga)
