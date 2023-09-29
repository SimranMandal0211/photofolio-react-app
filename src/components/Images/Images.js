import editIcon from '../../assets/images/editIcon.jpg';
import deleteIcon from '../../assets/images/deleteIcon.png';

import './images.css';
export default function Images( {images, handleEditImage,handleDeleteImage, setSelectedImage} ){
    return (
        <>
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
        </>
    )
}