import React, { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './imagelist.css';

export default function Imageslist(){
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    return (
        <>
            <div className="img-page">
                <div className="top-box">
                    <img alt="back"
                        className="back"
                        src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png"
                    />

                    <h1>Images in Album</h1>
                    <button className="addingImg">Add Image</button>
                </div>


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
                        <button className="clear">Clear</button>
                        <button className="create">Add</button>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </>
    )
}