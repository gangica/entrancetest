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

    default:
      return state
  }
}

export default userReducer