const initialState = {
  loading: false,
  error: false,
  user: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: !state.loading
      }

    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }

    case 'FETCH_FAIL': 
      return {
        ...state,
        error: true
      }

    default:
      return state
  }
}

export default userReducer