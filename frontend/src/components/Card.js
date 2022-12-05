/* eslint-disable prettier/prettier */
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { useContext } from 'react';

function Card({ card, onCardClick, onCardLike, link, name, likesNumber, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id || card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-button ${isOwn ? '' : 'element__delete-button_hidden'
    }`;

  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''
    }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  return (
    <div className="element">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="element__image-container">
        <img className="element__image" src={link} alt={name} onClick={handleClick} />
      </div>
      <div className="element__title-container">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-number">{likesNumber}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
