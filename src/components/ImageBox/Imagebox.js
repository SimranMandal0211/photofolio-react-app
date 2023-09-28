import './imagebox.css';
import crossBtn from '../../assets/images/crossBtn.jpg';

export default function Imagebox( {imageUrl, onClose} ){
    return (
        <div className="img-box">
            <div className='close-btn-box'>
                <img src={crossBtn} className="close-btn" onClick={onClose} />
            </div>
            <img src={imageUrl} className="img" alt="Image" />
        </div>
    )
}