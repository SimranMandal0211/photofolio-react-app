import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import editIcon from '../../assets/images/editIcon.jpg';
import deleteIcon from '../../assets/images/deleteIcon.png';
import './imagelist.css';
import Imagebox from "../ImageBox/Imagebox";

// import firebase methods here
import { collection, addDoc, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseInit";

export default function Imageslist( {albumId, onBackClick} ){
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editImageId, setEditImageId] = useState(null);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
 
    const [buttonStyles, setButtonStyles] = useState({
        backgroundColor: '#bccaf6',
        borderColor: 'rgba(66, 17, 159, 0.84)',
        color: 'rgba(66, 17, 159, 0.84)',
    });

    const [currentIndex, setCurrentIndex] = useState(0); // Track current image index

    const prevImage = (prevIndex) => {
        if (prevIndex >= 0) {
          setCurrentIndex(prevIndex);
        }
    };
      
      const nextImage = (nextIndex) => {
        if (nextIndex < images.length) {
          setCurrentIndex(nextIndex);
        }
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);

        setButtonStyles((prevStyles) => ({
            ...prevStyles,
            backgroundColor: prevStyles.backgroundColor === 'rgb(246, 188, 188)' ? '#bccaf6' : 'rgb(246, 188, 188)',
            borderColor: prevStyles.borderColor === 'rgba(249, 18, 18, 0.93)' ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
            color: prevStyles.color === 'rgba(249, 18, 18, 0.93)' ? 'rgba(66, 17, 159, 0.84)' : 'rgba(249, 18, 18, 0.93)',
          }));
    }

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

            setTitle('');
            setImageUrl('');
            setEditImageId(null);
        }catch(err){
            console.error('Error adding/updating image: ', err);
        }
    }

    const handleEditImage = (image) => {
        setTitle(image.title);
        setImageUrl(image.imageUrl);
        setEditImageId(image.id);
        setShowForm(true);
        setSelectedImage(image);
    }

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
            setImages(imagesData);
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
                                onChange={(e) => setTitle(e.target.value)}
                        />
                        <input type="text"
                                className="imgUrl"
                                placeholder="Image URL"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}

                        />
                        <div className="btn-box-imgurl-form">
                            <button className="clear"
                                    onClick={() => {
                                        setTitle('');
                                        setImageUrl('');
                                        setEditImageId(null);
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

                    <h1>{images.length === 0 ? `No images in Album` : `Images in Album`}</h1>
                    <button className="addingImg" 
                        onClick={handleToggleForm}
                        style={buttonStyles}
                    >{showForm ? 'Cancel' : 'Add Image'}</button>
                </div>

                <div className="images-list-box">
                    {images.map((image, index) =>  (
                        <div className="img-card"
                            key={index}    
                        >
                            <div className="edit-delete-icon">
                                <div>
                                    <img alt="edit"
                                        className="edit"
                                        src={editIcon}
                                        onClick={() => handleEditImage(image)}
                                    />
                                </div>
                                        
                                <div>
                                    <img alt="delete"
                                        className="delete"
                                        src={deleteIcon}
                                        onClick={() => handleDeleteImage(image.id)}
                                    />
                                </div>
                            </div>
                            
                            <img src={image.imageUrl}
                                alt=""
                                className="url-image"
                                onClick={() => setSelectedImage(image)}
                            />
                            <h1>{image.title}</h1>
                        </div>
                        
                    ))}

                </div>

                {selectedImage && (
                    <Imagebox imageUrl={selectedImage.imageUrl}
                        onClose={() => setSelectedImage(null)}
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