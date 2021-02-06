import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import Card from './Card.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState('');
  const [loading, setLoading] = React.useState('Сохранить');
  const [loadingPlace, setLoadingPlace] = React.useState('Создать');


  React.useEffect(() => {
    Promise.all([
      api.getUserData(),
      api.getInitialCards()
    ])
    .then(([userInfo, initialCards]) => {
      setCurrentUser(userInfo);
      setCards(initialCards)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])


  React.useEffect(() => {
    const ESC = 'Escape';
    function handleEscClose(evt) {
      if (evt.key === ESC) {
        closeAllPopups();
      }
    }
    document.addEventListener('keyup', handleEscClose);
    return () => document.removeEventListener('keyup', handleEscClose)
  }, [])


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setLoading('Сохранить')
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setLoading('Сохранить')
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setLoadingPlace('Создать')
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({})
  }

  function handleCardClick(card) {
    setSelectedCard({
      link: card.link,
      name: card.name
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
    })
      .catch((err) => {
      console.log(err)
      })

  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(()=>{
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err)
        })
  }

  function handleUpdateUser(userInfo) {
    setLoading('Сохранение...');
    api.saveUserData(userInfo)
      .then((inputValues)=> {
        setCurrentUser(inputValues);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
        })
  }

  function handleUpdateAvatar(data) {
    setLoading('Сохранение...');
    api.saveAvatar(data)
      .then((avatar)=> {
        setCurrentUser(avatar);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
        })
  }

  function handleAddPlaceSubmit(data) {
    setLoadingPlace('Сохранение...')
    api.saveNewCard(data)
      .then((newCard)=> {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
        })
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header/>

      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        userAvatar={currentUser.avatar}
        name={currentUser.name}
        about={currentUser.about}
        cards={
          cards.map((card)=>{
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            )
          })
        } />

      <Footer/>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        btnValue={loading} />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        btnValue={loadingPlace} />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />

      <ConfirmationPopup />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        btnValue={loading} />

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App
