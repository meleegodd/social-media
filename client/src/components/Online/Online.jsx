import React from 'react'
import "./online.css"

export default function Online({ user }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="rightbarFriend">
            <div className="rightbarProfile">
                <img src={PF + user.profilePicture} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <div className="rightbarUserName">{user.username}</div>
        </li>
    )
}
