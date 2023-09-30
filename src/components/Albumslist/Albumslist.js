import React, { useEffect, useReducer } from "react";

import AlbumForm  from '../AlbumForm/AlbumForm';
import Imageslist from "../Imageslist/Imageslist";
import './albumslist.css';
import GalleryIcon from '../../assets/images/photoGalleryIcon.jpg';


// import firebase methods here
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseInit";


// Define Initial state
const initialState = {
    showForm: false,
    albums: [],
    albumName: '',
    selectedAlbumId: null,
    buttonStyles: {
        backgroundColor: '#bccaf6',
        borderColor: 'rgba(66, 17, 159, 0.84)',
        color: 'rgba(66, 17, 159, 0.84)',
    },
};

// reducer function
function reducer(state, action){
    switch(action.type){
        case 'TOGGLE_FORM' :
            return {
                ...state,
                showForm: action.payload,
                buttonStyles: {
                    backgroundColor: action.payload ? '#bccaf6' : 'rgb(246, 188, 188)',
                    borderColor: action.payload ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
                    color: action.payload ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
                },
            };
        case 'CHANGE_BUTTON_STYLES': 
            return {
                ...state,
                buttonStyles: {
                    backgroundColor: action.payload.backgroundColor,
                    borderColor: action.payload.borderColor,
                    color: action.payload.color
                },
            };
        case 'SET_ALBUMS' :
            return {
                ...state,
                albums: action.payload,
            };
        case 'SET_ALBUM_NAME':
            return{
                ...state,
                albumName: action.payload,
            };
        case 'SET_SELECTED_ALBUM_ID' :
            return {
                ...state,
                selectedAlbumId: action.payload,
            };
        case 'SET_BUTTON_STYLES' :
            return {
                ...state,
                buttonStyles: action.payload,
            };
        default :  return state;
    }
}


function Albumslist(){
    const [state, dispatch] = useReducer(reducer, initialState);

     // Toggle the visibility of the album creation form
    const handleAddAlbum = () => {
        // setShowForm((prevShowForm) => !prevShowForm);
        // setButtonStyles((prevStyles) => ({
        //     ...prevStyles,
        //     backgroundColor: prevStyles.backgroundColor === 'rgb(246, 188, 188)' ? '#bccaf6' : 'rgb(246, 188, 188)',
        //     borderColor: prevStyles.borderColor === 'rgba(249, 18, 18, 0.93)' ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
        //     color: prevStyles.color === 'rgba(249, 18, 18, 0.93)' ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
        //   }));

        dispatch({ type: 'TOGGLE_FORM', payload: !state.showForm });
        dispatch({ 
            type: 'CHANGE_BUTTON_STYLES', 
            payload: {
                backgroundColor: state.showForm ? '#bccaf6' : 'rgb(246, 188, 188)',
                borderColor: state.showForm ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
                color: state.showForm ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
            },
        });
    };

    // fetchAlbum data from databse
    const fetchAlbums = async () => {
        const snapShot = await getDocs(collection(db, 'albums'));
        const albumsData = [];
        snapShot.forEach((doc) => {
            albumsData.push({ id: doc.id, name: doc.data().name });
        });
        // setAlbums(albumsData);
        dispatch({ type: 'SET_ALBUMS', payload: albumsData });
    }

    // Create a new album
    const handleAlbumCreate = async (name) => {
        console.log('name:' , name);
        // const newAlbum = { id: Date.now(), name: name };
        // setAlbums([...albums, newAlbum]);
        // setAlbumName(name);
        try{
            const newAlbumRef = await addDoc(collection(db, 'albums'),{
                name: name,
            });

            const newAlbumData = {
                id: newAlbumRef.id,
                name: name,
            }

            // setAlbumName(name);
            // setAlbums([...albums, newAlbumData]);
            dispatch({ type: 'SET_ALBUMS', payload: newAlbumData });
            dispatch({ type: 'SET_ALBUM_NAME', payload: name });

            fetchAlbums();
            console.log('creating album try', newAlbumData);
        }catch(err){
            console.error('Error creating album', err);
        }
    }

    useEffect(() => {
        // console.log('albums', state.albums);
        fetchAlbums();
    }, []);


    // when an album is clicked
    const handleAlbumClick = (albumId) => {
        // setSelectedAlbumId(albumId);
        // setShowForm(false);
        dispatch({ type: 'SET_SELECTED_ALBUM_ID', payload: albumId });
        dispatch({ type: 'TOGGLE_FORM', payload: false});
    }

    // when the back button is clicked
    const handleBackClick = () => {
        // setSelectedAlbumId(null);
        dispatch({ type: 'SET_SELECTED_ALBUM_ID', payload: null });
    }

    return (
    <>
        {state.showForm && <AlbumForm onAlbumCreate={handleAlbumCreate} />}
    
        {!state.selectedAlbumId && ( 
            <div className="albumListMain">
                <span><h2>Your Album</h2></span>
                <button onClick={handleAddAlbum}
                        style={state.buttonStyles}
                >
                    {state.showForm ? 'Cancel' : 'Add Album'}
                </button>
            </div>
        )}

        {!state.selectedAlbumId && state.albums.length > 0 && (
            <ul className="albumList">
                {state.albums.map((album) => (
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

        {state.selectedAlbumId && (
            <Imageslist albumId={state.selectedAlbumId} onBackClick={handleBackClick} />
        )}
        
    </>
    );
}
export default Albumslist;