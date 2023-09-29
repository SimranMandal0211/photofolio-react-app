import './imagebox.css';
import crossBtn from '../../assets/images/crossBtn.jpg';

export default function Imagebox( { imageUrl, images, onClose, onNext, onPrev , currentIndex , totalImages } ){
    const nextIndex = (currentIndex + 1) % totalImages;
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages;

    return (
        <div className="img-box">
            <div className='close-btn-box'>
                <img src={crossBtn} className="close-btn" onClick={onClose} />
            </div>
            
            <button className='prev-btn' onClick={() => onPrev(prevIndex) }>&lt;</button>
            <img src={images[currentIndex].imageUrl} className="img" alt="Image" />
            <button className='next-btn' onClick={() => onNext(nextIndex) }>&gt;</button>
            
            <div className='image-counter' style={{display: 'none'}}>
                {currentIndex + 1} / {totalImages}
            </div>
        </div>
    )
}