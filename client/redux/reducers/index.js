import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import prod from './product-list'
import logs from './logs'

const createRootReducer = (history) =>
  combineReducers(
    {
      prod,
      logs,
      router: connectRouter(history)
    }
  )

export default createRootReducer
