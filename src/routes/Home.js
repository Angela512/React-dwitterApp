import React, {useEffect, useState} from 'react';
import { dbService } from '../firebase';
import Dweet from '../components/Dweet';
import DweetForm from '../components/DweetForm';

const Home = ({userObj}) => {
    const [dweets, setDweets] = useState([]);
    useEffect(() => {
        dbService.collection("dweets").orderBy("createdAt","desc").onSnapshot((snapshot) => {
            const dweetArray = snapshot.docs.map(doc => ({
                id:doc.id, 
                ...doc.data(),
            }));
            setDweets(dweetArray);
        });
    }, []);
    

    return ( //attach가 있을때만 img띄움
        <div>
        <DweetForm userObj={userObj} />
        <div>
            {dweets.map(dweet => (
            <Dweet key={dweet.id} 
            dweetObj={dweet} 
            isOwner={dweet.creatorId === userObj.uid}/>
            ))}
        </div>
        </div>
    );
};

export default Home;