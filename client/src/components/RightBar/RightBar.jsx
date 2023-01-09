import React, { useContext, useEffect, useState } from 'react'
import "./rightbar.css"
import { Users } from '../../dummyData'
import Online from '../Online/Online'
import axios from 'axios'
import { DOMAIN } from '../../util/constant/SettingSystem'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import AddBoxIcon from '@mui/icons-material/AddBox'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { follow, unFollow } from '../../context/AuthAction'

export default function RightBar({ user }) {
    const [friend, setFriends] = useState([])
    const { user: currentUser, dispatch } = useContext(AuthContext)
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`${DOMAIN}/users/friends/${user?._id}`);
                setFriends(friendList.data);
            } catch (error) {
                console.log(error);
            }
        };
        getFriends();
    }, [user]);

    const handleFollow = async () => {
        try {
            if (!followed) {
                await axios.put(`${DOMAIN}/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch(follow(user._id));
            } else {
                await axios.put(`${DOMAIN}/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch(unFollow(user._id));
            }
            setFollowed(!followed);
        } catch (err) {
            console.log(err)
        }
    }

    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className='birthdayImg' src="./assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <hr className='rightbarHr' />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(user => (
                        <Online key={user.id} user={user} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
                {user.username !== currentUser.username &&
                    (<button onClick={handleFollow} className="rightbarFollowButton">
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <CheckBoxIcon /> : <AddBoxIcon />}
                    </button>)
                }
                <h4 className="rightBarTitle">User infomation</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className='rightbarInfoKey'>City:</span>
                        <span className='rightbarInfoValue'>{user.city}</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className='rightbarInfoKey'>From:</span>
                        <span className='rightbarInfoValue'>{user.from}</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className='rightbarInfoKey'>Relationship:</span>
                        <span className='rightbarInfoValue'>{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
                    </div>
                </div>

                <h4 className="rightBarTitle">User friend</h4>
                <div className="rightbarFollowings">
                    {friend.map((friend, index) => (
                        <Link key={index} to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                            <div className="rightbarFollowing">
                                <img src={friend.profilePicture} alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }

    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    )
}
