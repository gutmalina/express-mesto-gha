import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({name, link, likes, owner, _id, onCardClick, onCardLike, onCardDelete} ){
    const currentUser = React.useContext(CurrentUserContext);

    /** Сравнить id автора карточки и id профиля */
  const isOwn = owner._id === currentUser._id;

  /** Сравнить id кто поставил лайк и id профиля */
  const isLiked = likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = `button button_type_delete-card ${!isOwn && 'button_type_delete-hidden'}`;
  const cardLikeButtonClassName = `button button_type_like-card ${isLiked ? 'button_active-like' : 'button_inactive-like'}`;

/** Передать данные карточки в попап с увеличенной картинкой */
  const handleClick=()=>{
    onCardClick({name, link});
  }

/** Передать данные карточки для установки лайка */
  const handleLikeClick=()=>{
    onCardLike({likes, owner, _id});
  }

/** Передать данные карточки для удаления */
  const handleDeleteClick=()=>{
    onCardDelete({owner, _id})
  }

  return(
    <article className="card">
      <img className="card__img"
        src={link}
        alt={name}
        onClick={handleClick}/>
      <div className="card__caption">
        <h2 className="card__text">{name}</h2>
        <button
          type="button"
          aria-label="Поставить лайк"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}>
        </button>
        <p className="card__like-counter">
            {likes.length}
        </p>
      </div>
      <button type="button"
        aria-label="Удалить фотографию"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}>
      </button>
    </article>
  )
}

export default Card;
