import React from 'react';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <div className="router__container">
            <Routes>
                {isLoggedIn ? (
                <>
                <Route exact path="/" element={<Home userObj={userObj} />}></Route>
                <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />}></Route>
                
                </>
                ) : (
                <>
                <Route exact path="/" element={<Auth />}></Route>
                </>
                )}
                
            </Routes>
            </div>
        </Router>
    )
};

export default AppRouter;