const initialState = {
  loading: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TEST":
      return {
        ...state,
        loading: action.payload.state
      }

    default:
      return state
  }
}

export default userReducer