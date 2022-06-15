import { 
  clearLocalStorage,
  getLocalAccessToken, 
  setLocalAccessToken 
} from "../../services/localStorage";
import { fetchData } from '../../services/fetchData';

export const fetchLoading = () => ({
  type: "LOADING"
})

export const login = (data, { callback, callbackFail }) => {
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
      handleError: (error) => {console.log(error?.response?.data?.errors)
        dispatch(fetchLoading());

        dispatch({
          type: "FETCH_FAIL"
        })

        const message = error?.response?.data?.errors?.message || error?.response?.data?.errors?.password || ["Đã có lỗi"];
        callbackFail(message[0])
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
          type: "FETCH_FAIL"
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
          type: "FETCH_FAIL"
        })
      }
    })
  }
}