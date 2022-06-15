import axios from "axios";

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
