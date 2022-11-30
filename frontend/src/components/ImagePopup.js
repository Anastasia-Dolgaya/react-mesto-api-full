import Popup from './Popup';

function ImagePopup({ link, title, isOpen, onClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} type="image" name="image">
      <figure className="popup__image-box">
        <img className="popup__image" src={link} alt="картинка" />
        <figcaption className="popup__caption">{title}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
