import axios from "axios";

export const mapValuesToObject = (fields) => {
  let result = {};

  fields.forEach(item => {
    result[item.id] = item.value
  })

  return result
}

export const fetchData = async ({
  config,
  handleSuccess = () => {},
  handleError = () => {}
}) => {
  try {
    const response = await axios(config)
    handleSuccess(response)
  } catch(error) {
    handleError(error)
  }
}

export const getLocalAccessToken = () => {
  return window.localStorage.getItem("token")
}

export const getAccessToken = (newToken) => {
  const localToken = getLocalAccessToken();

  if ((!localToken || localToken === "undefined") && newToken) {
    setLocalAccessToken(newToken)
    return newToken
  }

  return localToken
}

export const setLocalAccessToken = (token) => {
  window.localStorage.setItem("token", token)
}

export const clearLocalStorage = (key) => {
  localStorage.removeItem(key)
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch(err) {
    console.log(err);
  }
};