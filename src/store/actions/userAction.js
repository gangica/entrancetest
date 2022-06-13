import { 
  clearLocalStorage, 
  fetchData, 
  getLocalAccessToken, 
  setLocalAccessToken 
} from "../../helpers";

export const fetchLoading = () => ({
  type: "LOADING"
})

export const login = (data, { callback }) => {
  return dispatch => {
    dispatch(fetchLoading())

    return fetchData({
      config: {
        method: "POST",
        url: "http://streaming.nexlesoft.com:4000/api/auth/signin",
        data
      },
      handleSuccess: (response) => {
        dispatch(fetchLoading())

        dispatch({
          type: "SET_USER",
          payload: response?.data
        })

        const accessToken = response?.data?.token || "";
        setLocalAccessToken(accessToken);

        callback()
      },
      handleError: (error) => {console.log(error)
        dispatch(fetchLoading())

        dispatch({
          type: "LOGIN_FAIL",
          payload: error
        })
      }
    })
  }
}

export const signup = (data, { callback }) => {
  return dispatch => {
    dispatch(fetchLoading())
    // console.log(data)
    return fetchData({
      config: {
        method: "POST",
        url: "http://streaming.nexlesoft.com:4000/api/auth/signup",
        data
      },
      handleSuccess: (response) => {
        dispatch(fetchLoading())

        dispatch({
          type: "SET_USER",
          payload: response.data
        })

        const accessToken = response?.data?.token || "";
        setLocalAccessToken(accessToken);

        callback()
      },
      handleError: (error) => {
        dispatch(fetchLoading())

        dispatch({
          type: "SIGNUP_FAIL",
          payload: error
        })
      }
    })
  }
}

export const logout = ({ callback }) => {
  return dispatch => {
    dispatch(fetchLoading())

    const localToken = getLocalAccessToken();

    return fetchData({
      config: {
        method: "POST",
        url: "http://streaming.nexlesoft.com:4000/api/auth/logout",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localToken}`
        }
      },
      handleSuccess: () => {
        dispatch(fetchLoading())

        clearLocalStorage("token");

        dispatch({
          type: "SET_USER",
          payload: {}
        })

        callback()
      },
      handleError: (error) => {
        dispatch(fetchLoading())

        dispatch({
          type: "LOGOUT_FAIL",
          payload: error
        })
      }
    })
  }
}