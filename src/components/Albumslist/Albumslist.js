import React, { useEffect, useState } from "react";

import AlbumForm  from '../AlbumForm/AlbumForm';
import Imageslist from "../Imageslist/Imageslist";
import './albumslist.css';
import GalleryIcon from '../../assets/images/photoGalleryIcon.jpg';


// import firebase methods here
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseInit";

function Albumslist(){
    const [showForm, setShowForm] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [albumName, setAlbumName] = useState('');
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [buttonStyles, setButtonStyles] = useState({
        backgroundColor: '#bccaf6',
        borderColor: 'rgba(66, 17, 159, 0.84)',
        color: 'rgba(66, 17, 159, 0.84)',
      });

     // Toggle the visibility of the album creation form
    const handleAddAlbum = () => {
        setShowForm((prevShowForm) => !prevShowForm);
        setButtonStyles((prevStyles) => ({
            ...prevStyles,
            backgroundColor: prevStyles.backgroundColor === 'rgb(246, 188, 188)' ? '#bccaf6' : 'rgb(246, 188, 188)',
            borderColor: prevStyles.borderColor === 'rgba(249, 18, 18, 0.93)' ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
            color: prevStyles.color === 'rgba(249, 18, 18, 0.93)' ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
          }));
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

    // when the back button is clicked
    const handleBackClick = () => {
        setSelectedAlbumId(null);
    }

    return (
    <>
        {showForm && <AlbumForm onAlbumCreate={handleAlbumCreate} />}
    
        {!selectedAlbumId && ( 
            <div className="albumListMain">
                <h2>Your Album</h2>
                <button onClick={handleAddAlbum}
                        style={buttonStyles}
                >
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
            <Imageslist albumId={selectedAlbumId} onBackClick={handleBackClick} />
        )}
        
    </>
    );
}
export default Albumslist;