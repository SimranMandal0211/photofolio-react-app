import React, { useState } from "react";

import './albumslist.css';

function Albumslist(){
    const [showForm, setShowForm] = useState(false);

     // Toggle the visibility of the album creation form
    const handleAddAlbum = () => {
        setShowForm((prevShowForm) => !prevShowForm);
    };

    return (
        <div className="albumListMain">
            <h2>Your Album</h2>
            <button onClick={handleAddAlbum}>
                {showForm ? 'Cancel' : 'Add Album'}
            </button>
        </div>
    );
}
export default Albumslist;