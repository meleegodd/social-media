import React, { useContext, useState } from 'react'
import './share.css'
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import PlaceIcon from '@mui/icons-material/Place';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DOMAIN } from '../../util/constant/SettingSystem';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Share() {
    const { user } = useContext(AuthContext)
    const [post, setPost] = useState({
        desc: "",
        file: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (post.file) {
            const data = new FormData();
            data.append("desc", post.desc);
            data.append("userId", user._id);
            data.append("file", post.file);
            try {
                await axios.post(`${DOMAIN}/posts`, data);
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios.post(`${DOMAIN}/posts`, {
                    userId: user._id,
                    desc: post.desc,
                });
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <Link to={`/profile/${user.username}`}>
                        <img className='shareProfileImg' src={user.profilePicture} alt='' />
                    </Link>
                    <input onChange={(e) => setPost({ ...post, desc: e.target.value })} style={{ paddingLeft: "15px" }} placeholder={"What's on your mind " + user.username + "?"} className="shareInput" />
                </div>
                <hr className="shareHr"></hr>
                {post.file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(post.file)} alt="" />
                        <CancelIcon onClick={() => setPost({ ...post, file: null })} className="shareCancelImg" fontSize="large" />
                        {/* <div className="shareCancelImg">x</div> */}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <LocalSeeIcon htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo/Video</span>
                            <input onChange={(e) => setPost({ ...post, file: e.target.files[0] })} style={{ display: "none" }} type='file' id='file' accept='.png, .jpeg, .jpg' />
                        </label>
                    </div>
                    <div className="shareOptions">
                        <div className="shareOption">
                            <LabelImportantIcon htmlColor='blue' className='shareIcon' />
                            <span className='shareOptionText'>Tag</span>
                        </div>
                    </div>
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PlaceIcon htmlColor='green' className='shareIcon' />
                            <span className='shareOptionText'>Location</span>
                        </div>
                    </div>
                    <div className="shareOptions">
                        <div className="shareOption">
                            <TagFacesIcon htmlColor='orange' className='shareIcon' />
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <div className="shareButtonOption">
                        <button className='shareButton' type='submit'>Share</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
