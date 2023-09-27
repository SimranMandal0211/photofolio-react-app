import React, { useState } from "react";

import AlbumForm  from '../AlbumForm/AlbumForm';
import './albumslist.css';
import GalleryIcon from '../../assets/images/photoGalleryIcon.jpg';

function Albumslist(){
    const [showForm, setShowForm] = useState(true);

     // Toggle the visibility of the album creation form
    const handleAddAlbum = () => {
        setShowForm((prevShowForm) => !prevShowForm);
        console.log('setShowform');
    };

    return (
    <>
        {showForm && <AlbumForm />}
    
        <div className="albumListMain">
            <h2>Your Album</h2>
            <button onClick={handleAddAlbum}>
                {showForm ? 'Cancel' : 'Add Album'}
            </button>
        </div>

        <div className="albumList">
            <div className="albumBox">
                <div className="imgBox">
                    <img src={GalleryIcon} alt="album" />
                </div>
                <span>album name</span>
            </div>
        </div>
    </>
    );
}
export default Albumslist;