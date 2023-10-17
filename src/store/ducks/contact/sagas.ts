import {call, put} from 'redux-saga/effects'
import api from '../../../services/api'

import {
  //Load
  loadAllcontactsFailure,
  loadAllcontactsRequest,
  loadAllcontactsSuccess,
  loadcontactsFailure,
  loadcontactsRequest,
  loadcontactsSuccess,
  createcontactFailure,
  createcontactRequest,
  createcontactSuccess,
  updatecontactFailure,
  updatecontactRequest,
  updatecontactSuccess,
  deletecontactFailure,
  deletecontactRequest,
  deletecontactSuccess
  
} from './actions'
import {Contact} from './types'

//Load
export function* loadAllcontacts(payload: ReturnType<typeof loadAllcontactsRequest>) {
  try {

    put(loadAllcontactsRequest())
    const response: Contact[] = yield call(api.get, 'contacts')
    yield put(loadAllcontactsSuccess(response))

  } catch (error: any) {
    yield put(loadAllcontactsFailure())
  }
}

//Load single
export function* loadcontacts(payload: ReturnType<typeof loadcontactsRequest>) {
  try {
    const response: Contact[] = yield call(api.get, 'contact/' + payload.payload)
    yield put(loadcontactsSuccess(response))
  } catch (error) {
    yield put(loadcontactsFailure())
  }
}

//Create
export function* createcontact(payload: ReturnType<typeof createcontactRequest>) {
  try {
    put(createcontactRequest(payload.payload))
    const response: Contact = yield call(api.post, 'contact', payload.payload)
    yield put(createcontactSuccess(response))
  } catch (error: any) {
    yield put(createcontactFailure(error.response.message))
  }
}

//Update
export function* updatecontact(payload: ReturnType<typeof updatecontactRequest>) {
  try {
    put(updatecontactRequest(payload.payload))
    const response: Contact = yield call(api.post, 'contact', payload.payload)
    yield put(updatecontactSuccess(response))
  } catch (error) {
    yield put(updatecontactFailure())
  }
}

//Delete
export function* deletecontact(payload: ReturnType<typeof deletecontactRequest>) {
  try {
    const response: Contact = yield call(api.delete, 'contact/' + payload.payload)
    yield put(deletecontactSuccess(response))
  } catch (error) {
    yield put(deletecontactFailure())
  }
}


