import React, { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './imagelist.css';

export default function Imageslist( {albumId, onBackClick} ){
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editImageId, setEditImageId] = useState(null);
    const [images, setImages] = useState([]);
 
    const handleToggleForm = () => {
        setShowForm(!showForm);
    }

    const handleAddImage = () => {
        try{
            if(editImageId !== null){
                const updatedImages = images.map((image) => {
                    if(image.id === editImageId){
                        return {
                            id: editImageId,
                            albumId,
                            title,
                            imageUrl
                        }
                    }
                    return image;
                });
                setImages(updatedImages);
                
                console.log('updatedImages', images);
                console.log('updatedImages', updatedImages);
                toast.success('Image update succesfully!');
            }else{
                const newImage = {
                    id: Date.now(),
                    albumId,
                    title,
                    imageUrl,
                };
                setImages([...images, newImage]);
    
                console.log('updatedImages', images);
                toast.success('Image added succesfully!');
            }

            setTitle('');
            setImageUrl('');
            setEditImageId(null);
        }catch(err){
            console.error('Error adding/updating image: ', err);
        }
    }

    return (
        <>
            <div className="img-page">
                <div className="top-box">
                    <img alt="back"
                        className="back"
                        src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png"
                        onClick={onBackClick}
                    />

                    <h1>Images in Album</h1>
                    <button className="addingImg" onClick={handleToggleForm}>{showForm ? 'Cancel' : 'Add Image'}</button>
                </div>


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

            </div>
            <ToastContainer />
        </>
    )
}