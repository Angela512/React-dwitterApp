import React from 'react';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn, userObj }) => {
    return(
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                <>
                <Route exact path="/" element={<Home userObj={userObj} />}></Route>
                <Route exact path="/profile" element={<Profile userObj={userObj} />}></Route>
                
                </>
                ) : (
                <>
                <Route exact path="/" element={<Auth />}></Route>
                
                </>
                )} 
            </Routes>
        </Router>
    )
};

export default AppRouter;