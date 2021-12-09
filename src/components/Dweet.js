import React, { useState } from 'react';
import { dbService, storageService } from '../firebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Dweet = ({ dweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false); //edit모드인지 아닌지 return
    const [newDweet, setNewDweet] = useState(dweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this dweet?");
        if(ok){
            await dbService.doc(`dweets/${dweetObj.id}`).delete();
            await storageService.refFromURL(dweetObj.fileUrl).delete();
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
    <div className="dweet">{
        editing ? (
            <>
        <form onSubmit={onSubmit} className="container dweetEdit">
            <input className="formInput"
            type="text"
            placeholder="Edit your Dweet" 
            value={newDweet} 
            onChange={onChange}
            autoFocus
            required />
            <input className="formBtn" type="submit" value="Update Dweet" />
        </form>
        <span className="formBtn calcelBtn" onClick={toggleEditing}>Cancel</span>
        </>
         ) : (
            <>
            <h4>{dweetObj.text}</h4>
            {dweetObj.fileUrl && <img src={dweetObj.fileUrl} /> }
            {isOwner && (
                <div class="dweet__actions">
                    <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                </div>
            )}
            </>
        )}
    </div>
);
        };
export default Dweet;