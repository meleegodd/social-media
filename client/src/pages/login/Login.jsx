import React, { useContext, useRef } from 'react'
import { loginCall } from '../../ApiCalls'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from "@mui/material"
import "./login.css"
import { Link } from 'react-router-dom'

export default function Login() {
    const email = useRef()
    const password = useRef()
    const { isFetching, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        loginCall(
            {
                email: email.current.value,
                password: password.current.value
            },
            dispatch
        )
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Fake Facebook</h3>
                    <div className="loginDesc">Connect with friends and the world around you on Fake Facebook</div>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder='Email' type="email" className="loginInput" required ref={email} />
                        <input placeholder='Password' type="password" className="loginInput" minLength={6} required ref={password} />
                        <button className="loginButton">{isFetching ? <CircularProgress style={{ width: "20px", height: "20px", color: "white" }} /> : "Log in"}</button>
                        <span className="loginForgot">Forgot?</span>
                        <hr className="loginHr" />
                        <Link to="/register" style={{ display: "flex", justifyContent: "center", textDecoration: "none" }}>
                            <button className="loginRegisterButton">{isFetching ? <CircularProgress style={{ width: "20px", height: "20px", color: "white" }} /> : "Create a New Account"}</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
