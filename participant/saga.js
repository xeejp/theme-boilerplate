import { fork, take, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

import { fetchContents } from 'shared/actions'

function* fetchContentsSaga() {
  yield call(sendData, 'fetch contents')
}

function* saga() {
  yield fork(takeEvery, fetchContents.getType(), fetchContentsSaga)
}

export default saga
