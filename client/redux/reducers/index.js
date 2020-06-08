import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import prod from './product-list'

const createRootReducer = (history) =>
  combineReducers(
    {
      prod,
      router: connectRouter(history)
    }
  )

export default createRootReducer
