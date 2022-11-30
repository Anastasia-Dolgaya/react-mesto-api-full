import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { useContext } from 'react';
import Card from './Card';

function Main({
  onAddPlace,
  onCardClick,
  onEditAvatar,
  onEditProfile,
  cards,
  onCardLike,
  onDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const renderCards = cards.map((card) => (
    <Card
      key={card._id}
      name={card.name}
      link={card.link}
      likesNumber={card.likes.length}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onDeleteClick={onDeleteClick}
      card={card}
    />
  ));

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__author">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
            <button
              type="button"
              className="profile__avatar-button"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">{renderCards}</section>
    </main>
  );
}

export default Main;
