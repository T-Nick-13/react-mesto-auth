import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header.js';
import Footer from './Footer.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header headerRoute="/sign-in" headerLink="Выйти" >
        <p className="header__user">Test@user.com</p>
      </Header>
      <main>
        <section
          className="profile page__profile">
          <div className="profile__container">
            <div className="profile__avatar_overlay" onClick={props.onEditAvatar} ></div>
            <img className="profile__avatar" src={currentUser.avatar} alt="Изображение аватар" />
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
              <p className="profile__occupation">{currentUser.about}</p>
            </div>
          </div>
          <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
        </section>
        <ul className="elements page__elements">{props.cards}</ul>
      </main>
      <Footer />
    </>
  )
}

export default Main;
