import React, { useState } from "react";
import './albumform.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AlbumForm( ) {
    const [albumName, setAlbumName] = useState('');

    const handleInputChange = (e) => {
        setAlbumName(e.target.value);
        console.log('input', e.target.value);
    }

    const handleCreateAlbum = () => {
        if(albumName.trim() === ``){
            toast.error('Please enter an album name');
        }else{
            toast.success('Album created successfully');
            console.log('input');
            setAlbumName('');
        }
    }

    const handleClear = () => {
        setAlbumName('');
    };

    return (
    <>
        <div className="albumForm flex">
            <div className="form flex">
                <h1>Create an Album</h1>
                <form className="inputBox">
                    <input type="text"
                            className="formInputs"
                            placeholder="Album Name"
                            value={albumName}
                            onChange={handleInputChange}
                            autoFocus 
                    />
                    <button className="clear formInputs" onClick={handleClear}>Clear</button>
                    <button className="create formInputs" onClick={handleCreateAlbum}>Create</button>
                </form>
            </div>
        </div>
        <ToastContainer />
    </>
    )
}

export default AlbumForm;