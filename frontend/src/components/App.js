import { useState, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { api } from 'utils/api';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState({
    open: false,
    card: {},
  });
  const [selectedCard, setSelectedCard] = useState({
    selected: false,
    card: {},
  });
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState({ open: false, registered: false });
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const saveBtnContent = 'Сохранить';
  const [buttonContent, setButtonContent] = useState(saveBtnContent);
  const [addButtonContent, setAddButtonContent] = useState('Создать');
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    handleLoginCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch initial data
  useEffect(() => {
    if (loggedIn) {
      api
        .fetchUserData()
        .then((res) => {
          setCurrentUser({ ...currentUser, ...res });
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
          setIsLoading(false);
        });

      api
        .fetchInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  // open popups
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleConfirmationPopupClick(card) {
    setConfirmationPopupOpen({ open: true, card: card });
  }
  // authorization
  function handleRegisterSuccess() {
    setInfoTooltipOpen({ open: true, registered: true });
  }

  function handleRegisterError() {
    setInfoTooltipOpen({ open: true, registered: false });
  }

  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        handleRegisterSuccess(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        handleRegisterError();
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email.value, password.value)
      .then(() => {
        setLoggedIn(true);
        setEmail(email.value);
        email.setValue('');
        password.setValue('');
        history.push('/');
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleLoginCheck() {
    auth.getContent().then((res) => {
      if (res._id) {
        setLoggedIn(true);
        setEmail(res.data.email);
        history.push('/');
      } else {
        history.push('/signin');
      }
    });
  }

  function signOut() {
    api
      .signout()
      .then(() => {
        history.push('/signin');
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  // close popups
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ selected: false, card: {} });
    setConfirmationPopupOpen({ open: false, card: {} });
    setInfoTooltipOpen({ open: false });
  }

  // update profile
  function handleUpdateUser(data) {
    setButtonContent('Сохранение');
    api
      .updateUserData(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setButtonContent(saveBtnContent);
      });
  }

  function handleUpdateAvatar(data) {
    setButtonContent('Сохранение');
    api
      .updateUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setButtonContent(saveBtnContent);
      });
  }

  // add new card and card functions
  function handleAddPlaceSubmit(data) {
    setAddButtonContent('Сохранение');
    api
      .addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setAddButtonContent('Создать');
      });
  }

  function handleCardClick(card) {
    setSelectedCard({ selected: true, card: card });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .fetchLikes(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header location={location} onSignOut={signOut} email={email} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onDeleteClick={handleConfirmationPopupClick}
            cards={cards}
            onCardLike={handleCardLike}
          />
          <Route path="/signup">
            <Register onRegisteration={handleRegistration} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} history={history} />
          </Route>
        </Switch>

        <Footer location={location} />

        {!isLoading && isEditProfilePopupOpen && (
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonContent={buttonContent}
          />
        )}

        {isAddPlacePopupOpen && (
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonContent={addButtonContent}
          />
        )}

        {isConfirmationPopupOpen.open && (
          <ConfirmationPopup
            isOpen={isConfirmationPopupOpen.open}
            onClose={closeAllPopups}
            onConfirmation={handleCardDelete}
            card={isConfirmationPopupOpen.card}
          />
        )}

        {isEditAvatarPopupOpen && (
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonContent={buttonContent}
          />
        )}

        {selectedCard.selected && (
          <ImagePopup
            link={selectedCard.card.link}
            title={selectedCard.card.name}
            isOpen={selectedCard.selected}
            onClose={closeAllPopups}
          />
        )}

        {isInfoTooltipOpen.open && (
          <InfoTooltip
            registered={isInfoTooltipOpen.registered}
            isOpen={isInfoTooltipOpen.open}
            onClose={closeAllPopups}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
