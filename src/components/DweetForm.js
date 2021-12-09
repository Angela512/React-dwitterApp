import React, {useState} from 'react';
import { dbService } from '../firebase';
import {ref, getStorage, uploadString, getDownloadURL} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const DweetForm = ({userObj}) => {
    const [dweet, setDweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async(event) => {
        if(dweet === ""){
            return;
        }
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
    const onClearPhoto = () => setAttachment("");
    return(
        <form className="factoryForm" onSubmit={onSubmit}>
            <div className="factoryInput__container">
                <input
                className="factoryInput__input"
                value={dweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>

            <input id="attach-file" 
            type="file" 
            onChange={onFileChange} 
            accept="image/*" 
            style={{
                opacity: 0,
            }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img src={attachment}
                    style={{
                        backgroundImage: attachment,
                    }}
                    />
                    <div className="factoryForm__clear" onClick={onClearPhoto}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
}
export default DweetForm;