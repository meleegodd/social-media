import React, { useContext } from 'react'
import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function TopBar() {

    const { user } = useContext(AuthContext)

    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <Link className="logo" to='/'>
                    FakeFacebook
                </Link>
            </div>
            <div className='topbarCenter'>
                <div className="searchBar">
                    <SearchIcon className='searchIcon' />
                    <input placeholder='Search on fake facebook' className="searchInput" />
                </div>
            </div>
            <div className='topbarRight'>
                <div className="topbarLinks">
                    <div className="topbarLink">Homepage</div>
                    <div className="topbarLink">Timeline</div>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <PersonIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <MessageIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsNoneIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.profilePicture} alt='' className='topbarImg' />
                    </Link>
                </div>
            </div>
        </div>
    )
}
