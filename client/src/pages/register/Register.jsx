import axios from 'axios'
import React, { useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { DOMAIN } from '../../util/constant/SettingSystem'
import "./register.css"

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        if (password.current.value !== passwordAgain.current.value) {
            passwordAgain.current.setCustomValidity("Mật khẩu không hợp lệ")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post(`${DOMAIN}/auth/register`, user)
                navigate("/login")
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className='register'>
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Fake Facebook</h3>
                    <div className="registerDesc">Connect with friends and the world around you on Fake Facebook</div>
                </div>
                <div className="registerRight">
                    <form onSubmit={handleClick} className="registerBox">
                        <input placeholder='Username' type="text" required className="registerInput" ref={username} />
                        <input placeholder='Email' type="email" required className="registerInput" ref={email} />
                        <input placeholder='Password' type="password" required minLength={6} className="registerInput" ref={password} />
                        <input placeholder='Password Again' type="password" required className="registerInput" ref={passwordAgain} />
                        <button className="registerButton">Sign Up</button>
                        <hr className="registerHr" />
                        <Link style={{ display: "flex", justifyContent: "center", textDecoration: "none" }} to="/login">
                            <button className="registerRegisterButton">Log into account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
