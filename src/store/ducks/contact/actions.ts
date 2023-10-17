import {action} from 'typesafe-actions'
import {ContactsTypes, Contact} from './types'

//Load
export const loadAllcontactsRequest = () => action(ContactsTypes.LOAD_ALLCONTACT_REQUEST)
export const loadAllcontactsSuccess = (data: Contact[]) =>
  action(ContactsTypes.LOAD_ALLCONTACT_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadAllcontactsFailure = () => action(ContactsTypes.LOAD_ALLCONTACT_FAILURE)

//Load single
export const loadcontactsRequest = (id: number) => action(ContactsTypes.LOAD_CONTACT_REQUEST, id)
export const loadcontactsSuccess = (data: Contact[]) =>
  action(ContactsTypes.LOAD_CONTACT_SUCCESS, data) //payload dps de LOAD_REQUEST
export const loadcontactsFailure = () => action(ContactsTypes.LOAD_CONTACT_FAILURE)

//Create
export const createcontactRequest = (newCart: Contact) =>
  action(ContactsTypes.CREATE_CONTACT_REQUEST, newCart)
export const createcontactSuccess = (cart: Contact) =>
  action(ContactsTypes.CREATE_CONTACT_SUCCESS, cart)
export const createcontactFailure = (error: {}) =>
  action(ContactsTypes.CREATE_CONTACT_FAILURE, error)

//Update
export const updatecontactRequest = (contactToUpdate: Contact) =>
  action(ContactsTypes.UPDATE_CONTACT_REQUEST, contactToUpdate)
export const updatecontactSuccess = (data: Contact) =>
  action(ContactsTypes.UPDATE_CONTACT_SUCCESS, data)
export const updatecontactFailure = () => action(ContactsTypes.UPDATE_CONTACT_FAILURE)

//Delete
export const deletecontactRequest = (id: number) =>
  action(ContactsTypes.DELETE_CONTACT_REQUEST, id)
export const deletecontactSuccess = (data: Contact) =>
  action(ContactsTypes.DELETE_CONTACT_SUCCESS, data)
export const deletecontactFailure = () => action(ContactsTypes.DELETE_CONTACT_FAILURE)
