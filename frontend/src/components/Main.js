import React from "react";
import Card from "./Card";
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardDelete, onCardClick, onCardLike}){
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="content indent__content">
      <section className="profile indent__profile">
        <button
          type="button"
          className="button button_avatar button_type_avatar-profile"
          onClick={onEditAvatar}>
          <img className="profile__avatar"
            src={currentUser.avatar}
            alt="Фотография профиля"/>
        </button>
        <div className="profile__info">
          <h1
            className="profile__info-title">
              {currentUser.name}
          </h1>
          <p
            className="profile__info-subtitle">
              {currentUser.about}
          </p>
          <button
            type="button"
            className="button button_type_edit-profile"
            aria-label="Редактировать"
            onClick={onEditProfile}>
          </button>
        </div>
        <button
          type="submit"
          className="button button-submit button_type_add-profile"
          aria-label="Добавить"
          onClick={onAddPlace}>
        </button>
      </section>
      <section className="group-cards indent__group-cards">
      {
        cards.map((card) => (
          <Card {...card} key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))
      }
      </section>
    </main>
  )
}

export default Main;
