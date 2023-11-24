import {Reducer} from 'redux'
import {UsersState, UsersTypes} from './types'

const INITIAL_STATE: UsersState = {
  data: [],
  error: false,
  loading: false,
  count: 0,
  selectedUsers: [],
  showPagination: true,
  filterStartDate: 0,
  filterEndDate: 0,
  
}

const reducer: Reducer<UsersState> = (state = INITIAL_STATE, action) => {
  console.log("actionXXX", action)
  switch (action.type) {
    //All
    case UsersTypes.LOAD_USERS_REQUEST:
      return {...state, loading: true, data: []}
    case UsersTypes.LOAD_USERS_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data.data, count: action.payload.data.count, showPagination: true}
    case UsersTypes.LOAD_USERS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //User
    case UsersTypes.LOAD_USER_REQUEST:
      return {...state, loading: true}
    case UsersTypes.LOAD_USER_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case UsersTypes.LOAD_USER_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Search
    case UsersTypes.SEARCH_USERS_REQUEST:
      return {...state, loading: true}
    case UsersTypes.SEARCH_USERS_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data.data, count: action.payload.data.data.length, showPagination: false}
    case UsersTypes.SEARCH_USERS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Search
    case UsersTypes.FILTER_USERS_REQUEST:
      return {
        ...state, 
        loading: true,
        filterStartDate: action.payload.startDate, 
        filterEndDate: action.payload.endDate,
      }
    case UsersTypes.FILTER_USERS_SUCCESS:
      return {
        ...state, 
        loading: false, 
        error: false, 
        data: action.payload.data.data, 
        count: action.payload.data.data.length, 
        showPagination: false, 
        //filterStartDate: action.payload.payload.startDate, 
        //filterEndDate: action.payload.payload.endDate,
      }
    case UsersTypes.FILTER_USERS_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}

    //Create
    case UsersTypes.CREATE_USER_REQUEST:
      return {...state}
    case UsersTypes.CREATE_USER_SUCCESS:
      return {...state, loading: false, error: false, data: [...state.data, action.payload.data]}
    case UsersTypes.CREATE_USER_FAILURE:
      return {...state, loading: false, error: action.payload}

    //Update
    case UsersTypes.UPDATE_USER_REQUEST:
      return {...state}
    case UsersTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.map((child) =>
          child.id === action.payload.data.id ? action.payload.data : child
        ),
      }
    case UsersTypes.UPDATE_USER_FAILURE:
      return {...state, loading: false, error: action.payload}

    //Delete
    case UsersTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data?.filter((item) => item.id !== action.payload.data.id),
      } //só uma data: pq excluiu o user "Excluido com sucesso."
    case UsersTypes.DELETE_USER_FAILURE:
      return {...state, loading: false, error: action.payload, data: []}


    case UsersTypes.SELECTED_USER_ADD:
      return {...state,}

    case UsersTypes.SELECTED_USER_ADD_SUCCESS:
      return {...state, selectedUsers: [action.payload, ...state.selectedUsers]}

    case UsersTypes.SELECTED_USER_REMOVE:
      return {...state,}

    case UsersTypes.SELECTED_USER_REMOVE_SUCCESS:
      return {
        ...state,
        selectedUsers: state.selectedUsers?.filter((item) => item.id !== action.payload.id),
      } 

    default:
      return state
  }
}

export default reducer
