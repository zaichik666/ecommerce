import axios from 'axios'

const UPDATE_LIST = 'UPDATE_LIST'

const initialState = { list: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST: {
      return { ...state, list: action.list }
    }
    default:
      return state
  }
}

export function getListData() {
  return (dispatch) => {
    axios.get('/api/products').then(({ data }) => {
      if (data.status === 'ok') {
        dispatch({ type: UPDATE_LIST, list: data.data })
      }
    })
  }
}
