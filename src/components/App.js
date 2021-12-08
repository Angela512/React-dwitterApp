import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import {getAuth, onAuthStateChanged, updateProfile} from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false); //아직 초기화되지 않음
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        
          setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, {
            displayName: user.displayName,
          }),
        });
 
          
        console.log(user);
        console.log(userObj);
        
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, {
        displayName: user.displayName,
      }),
    });
  };

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
