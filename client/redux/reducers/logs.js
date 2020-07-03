import axios from 'axios'

const NAVIGATE_TO_URL = 'NAVIGATE_TO_URL'
const GET_LOGS = 'GET_LOGS'
const SET_BASE = 'SET_BASE'

const initialState = {
  logs: []
}

export default (state = initialState, action, getState) => {
  const log =
    action.type === SET_BASE
      ? `${action.type} from ${getState().prod.oldBase} to ${action.base}`
      : Object.values(action).join(' ')

  const logWithDate = `${new Date().toISOString()} ${log}`

  if (action.type.indexOf('@@') !== 0) {
    axios.post('/api/v1/logs', {
      headers: { 'Content-Type': 'application/json' },
      data: log
    })
    return {
      ...state,
      logs: [...state.logs, logWithDate]
    }
  }

  return { ...state }
}

export function urlClick(url) {
  return { type: NAVIGATE_TO_URL, url }
}

export function getLogs() {
  return (dispatch) => {
    axios.get('/api/v1/logs').then((res) => {
      dispatch({ type: GET_LOGS, logs: res.data })
    })
  }
}
/*
import axios from 'axios'
import prod from './product-list'

const NAVIGATE_TO_URL = 'NAVIGATE_TO_URL'
const GET_LOGS = 'GET_LOGS'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION'
const SET_BASE = 'SET_BASE'
const SET_ORDER = 'SET_ORDER'

const initialState = {
  logs: []
}

export default async (state=initialState, action) => {

  const getLog = (str) => {
    switch (str) {
      case ADD_TO_SELECTION: {
        return JSON.stringify(`${action.type} id: ${action.id}`)
      }
      case REMOVE_FROM_SELECTION: {
        return JSON.stringify(`${action.type} id: ${action.id}`)
      }
      case SET_ORDER: {
        return JSON.stringify(`${action.type} to ${action.order}`)
      }

      case SET_BASE: {
        return JSON.stringify(`${action.type} from ${prod.oldBase} to ${action.url}`)
      }

      case NAVIGATE_TO_URL: {
        return JSON.stringify(`${action.type} ${action.url}`)
      }
      default: return ''
    }
  }

  const log = getLog(action.type)
  const now = new Date()
  const logWithDate = `${JSON.stringify(now)} ${log}`

  if (action.type === GET_LOGS) {
    return {...state, logs: [...state.logs, action.logs]}
  }

  if (action.type.indexOf('@@') !== 0) {
    await axios.post('/api/v1/logs', {
        headers: { 'Content-Type': 'application/json' },
        data: log
      })
    return ({...state, logs:[...state.logs, logWithDate]})
  }
  return ({...state})
}

export function urlClick(url) {
  return ({ type: NAVIGATE_TO_URL, url })
}

export async function getLogs () {
  return (dispatch) => {
    axios.get('/api/v1/logs').then((res) => {
      dispatch({ type: GET_LOGS, logs: res.data })
    })
  }
}
*/
