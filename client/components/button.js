import React from 'react'
import { useDispatch } from 'react-redux'

const Button = (props) => {
  const { actionFunction, text, id } = props
  const dispatch = useDispatch()
  return (
    <button
      type="button"
      className="bg-gray-700 hover:bg-gray-900 text-xs text-white px-2 py-1 rounded-sm"
      onClick={() => {
        dispatch(actionFunction(id))
      }}
    >
      {text}
    </button>
  )
}

export default Button
