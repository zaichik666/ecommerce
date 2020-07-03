import axios from 'axios'

const UPDATE_LIST = '@@UPDATE_LIST'
const GET_RATES = '@@GET_RATES'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION'
const SET_BASE = 'SET_BASE'
const SET_ORDER = 'SET_ORDER'

const initialState = {
  list: [],
  prices:{},
  selection: {},
  rates: {'EUR': 1},
  base: 'EUR',
  oldBase:'EUR',
  order: 'default' }

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_SELECTION: {
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.id]: (state.selection[action.id] || 0) + 1
        }
      }
    }

    case REMOVE_FROM_SELECTION: {
      const newSelection = {
        ...state.selection,
        [action.id]: +state.selection[action.id] - 1
      }
      if (!newSelection[action.id]) {
        delete newSelection[action.id]
      }
      return {
        ...state,
        selection: newSelection
      }
    }

    case UPDATE_LIST: {
      const idPrices = action.list.reduce((acc, rec) => {
        return { ...acc, [rec.id]: rec.price }
      }, {})
      return { ...state, list: action.list, prices: idPrices }
    }

    case GET_RATES: {
      return { ...state, rates: { ...state.rates, ...action.rates } }
    }

    case SET_BASE: {
      const oldBase = state.base
      return { ...state, base: action.base, oldBase }
    }

    case SET_ORDER: {
      return { ...state, order: action.order }
    }

    default:
      return state
  }
}

export function getListData() {
  return (dispatch) => {
    axios.get('/api/v1/products').then((list) => {
      dispatch({ type: UPDATE_LIST, list: list.data })
    })
  }
}

export function getRates () {
  return (dispatch) => {
    axios.get('/api/v1/rates').then((res) => {
      dispatch({ type: GET_RATES, rates: res.data })
    })
  }
}

export function setBase(base) {
  return {type: SET_BASE, base}
}

export function setOrder(order) {
  return { type: SET_ORDER, order }
}

export function addSelection(id) {
  return { type: ADD_TO_SELECTION, id }
}

export function removeSelection(id) {
  return { type: REMOVE_FROM_SELECTION, id }
}
