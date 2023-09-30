import React, { useEffect, useState, useReducer } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import searchIcon from '../../assets/images/searchIcon.jpg';
import crossBtn from '../../assets/images/crossBtn.jpg';

import './imagelist.css';
import Imagebox from "../ImageBox/Imagebox";
import Images from "../Images/Images";

// import firebase methods here
import { collection, addDoc, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseInit";

// define initial state 
const initialState = {
    image: {
        title: '',
        imageUrl: '',
        showForm: false,
        editImageId: null,
        images:[],
        filteredImages:[], // state.image.images,
    },
    search: {
        isSearchVisible: true,
        isSearchInputVisible: false,
        searchInput: '',
        currentIndex: 0,
    },
};

// reducer functions for useReducer..

function imageReducer(state, action){
    switch(action.type){
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_IMAGE_URL': 
            return { ...state, imageUrl: action.payload };
        case 'SET_SHOW_FORM':
            return { ...state, showForm: action.payload };
        case 'SET_EDIT_IMAGE_ID':
            return { ...state, editImageId: action.payload };
        case 'SET_IMAGES':
            return { ...state, images: action.payload };
        case 'SET_FILTERED_IMAGES':
            return { ...state, filteredImages: action.payload };
        default: return state;
    }
}

function searchReducer(state, action){
    switch(action.type){
        case 'SET_SEARCH_VISIBLE':
            return { ...state, isSearchVisible: action.payload };
        case 'SET_SEARCH_INPUT_VISIBLE': 
            return { ...state, isSearchInputVisible: action.payload };
        case 'SET_SEARCH_INPUT':
            return { ...state, searchInput: action.payload };
        case 'SET_SEARCH_ACTIVE':
            return { ...state, isSearchActive: action.payload };
        case 'SET_CURRENT_INDEX':
            return { ...state, currentIndex: action.payload };
        default: return state;
    }
}

export default function Imageslist( {albumId, onBackClick} ){
    const [selectedImage, setSelectedImage] = useState(null);
    const [buttonStyles, setButtonStyles] = useState({
        backgroundColor: '#bccaf6',
        borderColor: 'rgba(66, 17, 159, 0.84)',
        color: 'rgba(66, 17, 159, 0.84)',
    });

    const [imageState, dispatchImage] = useReducer(imageReducer, initialState.image);
    const [searchState, dispatchSearch] = useReducer(searchReducer, initialState.search);
   
    const { 
        title,
        imageUrl,
        showForm,
        editImageId,
        images,
        filteredImages,
    } = imageState;

    const {
        isSearchVisible,
        isSearchInputVisible,
        searchInput,
        currentIndex,
    } = searchState;

    // previous image click handle
    const prevImage = (prevIndex) => {
        if (prevIndex >= 0) {
        //   setCurrentIndex(prevIndex);
          dispatchSearch({ type: 'SET_CURRENT_INDEX', payload: prevIndex });
        }
    };
    
    // next image click handle
      const nextImage = (nextIndex) => {
        if (nextIndex < images.length) {
        //   setCurrentIndex(nextIndex);
          dispatchSearch({ type: 'SET_CURRENT_INDEX', payload: nextIndex });
        }
    };

    // toggle search
    const toggleImgAndSearchInput = () => {
        // setSearchVisible(!isSearchVisible);
        // setSearchInputVisible(!isSearchInputVisible);

        dispatchSearch({ type: 'SET_SEARCH_VISIBLE', payload: !isSearchVisible });
        dispatchSearch({ type: 'SET_SEARCH_INPUT_VISIBLE', payload: !isSearchInputVisible });

        if(!isSearchInputVisible){
            // setSearchInput('');
            // setFilteredImages(images);
            dispatchSearch({ type: 'SET_SEARCH_INPUT', payload: '' });
            dispatchImage({ type: 'SET_FILTERED_IMAGES', payload: images });
        }
    }

    // handle search
    const handleSearchInput = (e) => {
        const searchText = e.target.value;
        // setSearchInput(searchText);
        dispatchSearch({ type: 'SET_SEARCH_INPUT', payload: searchText });

        // filter images based on the input
        const filtered = images.filter((image) => image.title.toLowerCase().includes(searchText.toLowerCase())
        );

        // setFilteredImages(filtered);
        dispatchImage({ type: 'SET_FILTERED_IMAGES', payload: filtered });
    }

    // handle toggle for image form
    const handleToggleForm = () => {
        // setShowForm(!showForm);
        dispatchImage({ type: 'SET_SHOW_FORM', payload: !showForm });

        setButtonStyles((prevStyles) => ({
            ...prevStyles,
            backgroundColor: prevStyles.backgroundColor === 'rgb(246, 188, 188)' ? '#bccaf6' : 'rgb(246, 188, 188)',
            borderColor: prevStyles.borderColor === 'rgba(249, 18, 18, 0.93)' ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
            color: prevStyles.color === 'rgba(249, 18, 18, 0.93)' ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
          }));
    }
    
    // add image
    const handleAddImage = async() => {
        try{
            // if(editImageId !== null){
            //     const updatedImages = images.map((image) => {
            //         if(image.id === editImageId){
            //             return {
            //                 id: editImageId,
            //                 albumId,
            //                 title,
            //                 imageUrl
            //             }
            //         }
            //         return image;
            //     });
            //     setImages(updatedImages);

            //     console.log('updatedImages', images);
            //     console.log('updatedImages', updatedImages);
            //     toast.success('Image update succesfully!');
            // }

            if(editImageId){
                await setDoc(doc(db, 'images', editImageId), {
                    albumId,
                    title,
                    imageUrl,
                });
                toast.success('Image update succesfully!');
            }
            else{
                const newImage = {
                    // id: Date.now(),
                    albumId,
                    title,
                    imageUrl,
                };
                await addDoc(collection(db, 'images'), newImage);
                // setImages([...images, newImage]);
                // console.log('updatedImages', images);

                toast.success('Image added succesfully!');
            }

            // setTitle('');
            // setImageUrl('');
            // setEditImageId(null);
            dispatchImage({ type: 'SET_TITLE', payload: '' });
            dispatchImage({ type: 'SET_IMAGE_URL', payload: '' });
            dispatchImage({ type: 'SET_EDIT_IMAGE_ID', payload: null });
        }catch(err){
            console.error('Error adding/updating image: ', err);
        }
    }

    // edit image data name/url
    const handleEditImage = (image) => {
        // setTitle(image.title);
        // setImageUrl(image.imageUrl);
        // setEditImageId(image.id);
        // setShowForm(true);

        dispatchImage({ type: 'SET_TITLE', payload: image.title });
        dispatchImage({ type: 'SET_IMAGE_URL', payload: image.imageUrl });
        dispatchImage({ type: 'SET_EDIT_IMAGE_ID', payload: image.id });
        dispatchImage({ type: 'SET_SHOW_FORM', payload: true });

    }

    // delete image btn handle
    const handleDeleteImage = async (imageId) => {
        try{
            await deleteDoc(doc(db, 'images', imageId));
            // const updatedImages = images.filter((image) => image.id !== imageId);
            // setImages(updatedImages);
            toast.success('Image deleted successfully!');
        }catch(err){
            console.error('Error deleting image: ', err);
        }
    }

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'images'), (snapShot) => {
            const imagesData = snapShot.docs
                .filter((doc) => doc.data().albumId === albumId)
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
            }));
            // setImages(imagesData);
            dispatchImage({ type: 'SET_IMAGES', payload: imagesData });
        });
        return () => {
            unsub();
        };
    }, [albumId]);


    return (
        <>
            <div className="img-page">

                {showForm && (
                    <div className="img-list-form">
                        <h1>Add Image to Album</h1>
                        <input type="text"
                                className="title"
                                placeholder="Title"
                                required
                                autoFocus
                                value={title}
                                onChange={(e) => 
                                    // setTitle(e.target.value)
                                    dispatchImage({ type: 'SET_TITLE', payload: e.target.value })
                                }
                        />
                        <input type="text"
                                className="imgUrl"
                                placeholder="Image URL"
                                value={imageUrl}
                                onChange={(e) => 
                                    // setImageUrl(e.target.value)
                                    dispatchImage({ type: 'SET_IMAGE_URL', payload: e.target.value })
                                }

                        />
                        <div className="btn-box-imgurl-form">
                            <button className="clear"
                                    onClick={() => {
                                        // setTitle('');
                                        // setImageUrl('');
                                        // setEditImageId(null);
                                        dispatchImage({ type: 'SET_TITLE', payload: '' });
                                        dispatchImage({ type: 'SET_IMAGE_URL', payload: '' })
                                        dispatchImage({ type: 'SET_EDIT_IMAGE_ID', payload: null })
                                    }}
                            >Clear</button>
                            <button className="create"
                                    onClick={handleAddImage}
                            >{editImageId ? 'Update' : 'Add'}</button>
                        </div>
                    </div>
                )}

                <div className="top-box">
                    <img alt="back"
                        className="back"
                        src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png"
                        onClick={onBackClick}
                    />

                    <span><h1>{images.length === 0 ? `No images in Album` : `Images in Album`}</h1></span>

                    <div className="search-box">
                        {isSearchInputVisible && (
                                <input type="text"
                                className="search-input"
                                placeholder="Search..."
                                autoFocus
                                value={searchInput}
                                onChange={handleSearchInput}
                            />
                        )}
                        <img src={isSearchVisible ? searchIcon : crossBtn  }
                            alt={isSearchVisible ? 'search' : 'cut' }
                            onClick={toggleImgAndSearchInput}
                        />
                    </div>

                    <button className="addingImg" 
                        onClick={handleToggleForm}
                        style={buttonStyles}
                    >{showForm ? 'Cancel' : 'Add Image'}</button>
                </div>

                <div className="images-list-box">
                    {isSearchVisible || searchInput === '' ? (
                        <Images images = {images}
                                handleEditImage = {handleEditImage}
                                handleDeleteImage = {handleDeleteImage}
                                setSelectedImage = {setSelectedImage} />
                    ) : (
                        <Images images = {filteredImages}
                                handleEditImage = {handleEditImage}
                                handleDeleteImage = {handleDeleteImage}
                                setSelectedImage = {setSelectedImage}
                         />
                    )}
                </div>

                {selectedImage && (
                    <Imagebox imageUrl={selectedImage.imageUrl}
                        onClose={() => 
                            setSelectedImage(null)
                            // dispatchImage({ type: 'SET_SELECTED_IMAGES', payload: null })
                        }
                        onNext = {nextImage}
                        onPrev = {prevImage}
                        currentIndex = {currentIndex}
                        totalImages = {images.length}
                        images = {images}
                    />
                )}
            </div>
            <ToastContainer />
        </>
    )
}