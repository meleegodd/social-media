import React, { useContext, useEffect, useState } from 'react'
import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { DOMAIN } from '../../util/constant/SettingSystem';
import { Link } from 'react-router-dom';
import { format } from "timeago.js"
import { AuthContext } from '../../context/AuthContext';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setisLiked] = useState(false)
    const [user, setUser] = useState({})
    const { user: currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${DOMAIN}/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    useEffect(() => {
        setisLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    const handleLike = () => {
        try {
            axios.put(`${DOMAIN}/posts/` + post._id + "/like", { userId: currentUser._id })
        } catch (err) {
            console.log(err)
        }
        setLike(!isLiked ? like + 1 : like - 1)
        setisLiked(!isLiked)
    }
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/profile/${user.username}`}>
                        <div className="postTopLeft">
                            <img className='postProfileImg' src={user.profilePicture} alt='' />
                            <div className='postTopLeftInfo'>
                                <div className="postUserName">{user.username}</div>
                                <div className="postDate">{format(post?.createdAt)}</div>
                            </div>
                        </div>
                    </Link>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className='postText'>{post?.desc}</span>
                    <img className='postImg' src={post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {!isLiked ? <ThumbUpOffAltIcon onClick={handleLike} htmlColor="#333" className='likeIcon' /> : <ThumbUpIcon onClick={handleLike} htmlColor="#1876f2" className='likeIcon' />}
                        {!isLiked ? <FavoriteBorderIcon onClick={handleLike} htmlColor="#333" className='heartIcon' /> : <FavoriteIcon onClick={handleLike} htmlColor="#f43c53" className='heartIcon' />}
                        <span className="postlikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentCounter">{post.comment} commnents</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
