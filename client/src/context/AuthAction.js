import { FOLLOW, LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, UNFOLLOW } from "./AuthConstants"

export const LoginStart = (userCredentials) => ({
    type: LOGIN_START
})

export const LoginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
})

export const LoginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
})

export const follow = (userId) => ({
    type: FOLLOW,
    payload: userId
})

export const unFollow = (userId) => ({
    type: UNFOLLOW,
    payload: userId
})
