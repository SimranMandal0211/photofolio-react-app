import React, { useEffect, useState } from "react";

import AlbumForm  from '../AlbumForm/AlbumForm';
import Imageslist from "../Imageslist/Imageslist";
import './albumslist.css';
import GalleryIcon from '../../assets/images/photoGalleryIcon.jpg';

function Albumslist(){
    const [showForm, setShowForm] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [albumName, setAlbumName] = useState('');
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);

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


    // when an album is clicked
    const handleAlbumClick = (albumId) => {
        setSelectedAlbumId(albumId);
        setShowForm(false);
    }

    return (
    <>
        {showForm && <AlbumForm onAlbumCreate={handleAlbumCreate} />}
    
        {!selectedAlbumId && ( 
            <div className="albumListMain">
                <h2>Your Album</h2>
                <button onClick={handleAddAlbum}>
                    {showForm ? 'Cancel' : 'Add Album'}
                </button>
            </div>
        )}

        {!selectedAlbumId && albums.length > 0 && (
            <ul className="albumList">
                {albums.map((album) => (
                    <li className="albumBox"
                        key={album.id}
                        onClick={() => handleAlbumClick(album.id)}    
                    >
                        <div className="imgBox">
                            <img src={GalleryIcon} alt="album" />
                        </div>
                        <span>{album.name}</span>
                    </li>
                ))}
            </ul>
        )}

        {selectedAlbumId && (
            <Imageslist />
        )}
        
    </>
    );
}
export default Albumslist;