import React from 'react'
import { useDispatch } from 'react-redux'
// import { getRates } from '../redux/reducers/product-list'

const ButtonSort = (props) => {
  const dispatch = useDispatch()
  const { action, value, base } = props

  return (
    <button
      type="button"
      className={`mx-2 ${base === value ? 'underline' : ''}`}
      onClick={() => {
        dispatch(action(value))
      }}
    >
      {value}
    </button>
  )
}

export default ButtonSort
