import axios from "axios"
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from "./context/AuthConstants"
import { DOMAIN } from "./util/constant/SettingSystem"

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: LOGIN_START })
    try {
        const res = await axios.post(`${DOMAIN}/auth/login`, userCredential)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    } catch (err) {
        dispatch({ type: LOGIN_FAILURE, payload: err })
    }
}