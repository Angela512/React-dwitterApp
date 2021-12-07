import React, {useEffect, useState} from 'react';
import { dbService } from '../firebase';
import {ref, getStorage, uploadString, getDownloadURL} from 'firebase/storage';
import Dweet from '../components/Dweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj}) => {
    const [dweet, setDweet] = useState("");
    const [dweets, setDweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    useEffect(() => {
        
        dbService.collection("dweets").orderBy("createdAt","desc").onSnapshot((snapshot) => {
            const dweetArray = snapshot.docs.map(doc => ({
                id:doc.id, 
                ...doc.data(),
            }));
            setDweets(dweetArray);
        });
    }, []);
    const onSubmit = async(event) => {
        event.preventDefault();
        let fileUrl = "";
        if(attachment !== "") { //사진 첨부 안하면 fileUrl없으니까
            const storage = getStorage();
            if(attachment !== ""){
                //파일 경로 참조 만들기
                const fileRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
                //storage 참조 경로로 파일 업로드하기
                const uploadFile = await uploadString(fileRef, attachment, "data_url");
                console.log(uploadFile);
                //storage에 있는 파일 url로 다운받기
                fileUrl = await getDownloadURL(uploadFile.ref);
            }
        }
        const dweetObj = {
            text: dweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            fileUrl
        };
       
        await dbService.collection("dweets").add(dweetObj);
        setDweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        const{
            target: {value},
        } = event; //event안에 있는 target안에 있는 value를 줘
        setDweet(value);
    };

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearPhoto = () => setAttachment(null);

    return ( //attach가 있을때만 img띄움
        <div>
        <form onSubmit={onSubmit}>
            <input value={dweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="file" onChange={onFileChange} accept="image/*" />
            <input type="submit" value="Dweet" />
            {attachment && (
                <div>
                <img src={attachment} width="50px" height="50px" />
                <button onClick={onClearPhoto}>Clear Image</button>
                </div>
            )}
        </form> 
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