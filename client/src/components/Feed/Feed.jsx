import React, { useContext, useEffect, useState } from 'react'
import Share from '../Share/Share'
import Post from '../Post/Post'
import "./feed.css"
import axios from "axios"
import { DOMAIN } from '../../util/constant/SettingSystem'
import { AuthContext } from '../../context/AuthContext'

export default function Feed({ username }) {

    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get(`${DOMAIN}/posts/profile/` + username)
                : await axios.get(`${DOMAIN}/posts/timeline/` + user._id)
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchPosts()
    }, [username, user._id])


    return (
        <div className='feed'>
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {posts.map(post => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}
