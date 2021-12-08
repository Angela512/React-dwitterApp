import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = ( {userObj} ) => (
<nav>
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/profile">{userObj.displayName === null ? "My Profile" : `${userObj.displayName}'s Profile`}</Link>
        </li>
        
            <span>{userObj.displayName === null ? "Update your profile to create display name" : null}</span>
        
    </ul>
</nav>
);


export default Navigation;
