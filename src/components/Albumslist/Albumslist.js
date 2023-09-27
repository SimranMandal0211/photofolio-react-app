import React, { useEffect, useState } from "react";

import AlbumForm  from '../AlbumForm/AlbumForm';
import './albumslist.css';
import GalleryIcon from '../../assets/images/photoGalleryIcon.jpg';

function Albumslist(){
    const [showForm, setShowForm] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [albumName, setAlbumName] = useState('');

     // Toggle the visibility of the album creation form
    const handleAddAlbum = () => {
        setShowForm((prevShowForm) => !prevShowForm);
        console.log('setShowform');
    };

    // Create a new album
    const handleAlbumCreate = (name) => {
        console.log('name:' , name);

        const newAlbum = { id: Date.now(), name: name };
        setAlbumName(name);
        setAlbums([...albums, newAlbum]);
    }

    useEffect(() => {
        console.log('albums', albums);
    }, [albums]);


    return (
    <>
        {showForm && <AlbumForm onAlbumCreate={handleAlbumCreate} />}
    
        <div className="albumListMain">
            <h2>Your Album</h2>
            <button onClick={handleAddAlbum}>
                {showForm ? 'Cancel' : 'Add Album'}
            </button>
        </div>

        <ul className="albumList">
            {albums.map((album) => (
                <li className="albumBox"
                    key={album.id}    
                >
                    <div className="imgBox">
                        <img src={GalleryIcon} alt="album" />
                    </div>
                    <span>{album.name}</span>
                </li>
            ))}
        </ul>

        
    </>
    );
}
export default Albumslist;