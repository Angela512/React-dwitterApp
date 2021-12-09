import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ( {userObj} ) => (
<nav>
    <ul className="navi__container" >
        <li>
            <Link to="/" className="navi__ToHome" >
                <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
            </Link>
        </li>
        <li>
        <Link to="/profile" className="navi__ToProfile" >
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span className="navi__profileName">
            {userObj.displayName === null ? "My Profile" : `${userObj.displayName}'s Profile`}
          </span>
        </Link>
        </li>
    </ul>
</nav>
);


export default Navigation;
