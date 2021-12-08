import React, { useState } from 'react';
import { dbService, storageService } from '../firebase';

const Dweet = ({ dweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false); //edit모드인지 아닌지 return
    const [newDweet, setNewDweet] = useState(dweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this dweet?");
        if(ok){
            await dbService.doc(`dweets/${dweetObj.id}`).delete();
            await storageService.ref(dweetObj.fileUrl).delete();
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = (event) => {
        event.preventDefault();
        dbService.doc(`dweets/${dweetObj.id}`).update({
            text:newDweet
        })
        setEditing(false);
    };
    const onChange = (event) => { //editing하는걸 볼 수가 없으니까
        const{
            target: {value},
        } = event;
        setNewDweet(value);
    };
    

    return (
    <div>{
        editing ? (
            <>
        <form onSubmit={onSubmit}>
            <input type="text"
            placeholder="Edit your Dweet" 
            value={newDweet} 
            onChange={onChange}
            required />
            <input type="submit" value="Update Dweet" />
        </form>
        <button onClick={toggleEditing}>Cancel</button>
        </>
         ) : (
            <>
            <h4>{dweetObj.text}</h4>
            {dweetObj.fileUrl && <img src={dweetObj.fileUrl} width="50px" height="50px" /> }
            {isOwner && (
                <>
                <button onClick={onDeleteClick}>Delete Dweet</button>
                <button onClick={toggleEditing}>Edit Dweet</button>
                </>
            )}
            </>
        )}
    </div>
);
        };
export default Dweet;