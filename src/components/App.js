import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import {getAuth, onAuthStateChanged, updateProfile} from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false); //아직 초기화되지 않음
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
        if(isLoggedIn && user.displayName === null){ //google이나 github으로 로그인하지않고 이메일로 로그인 시 displayName이 null이 되는 경우
          const at = user.email.indexOf("@");
          const end = user.email.substring(0, at);
          updateProfile(auth.currentUser, {
            displayName: end,
          });
        }
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
