import React from "react";
import Popup from "./Popup";

function ImagePopup({card, onClose}){
  const {link, name} = card

  return(
    <Popup
      card={card}
      onClose={onClose}
      name="image">
      <figure className="popup__image-container">
        {
          card &&
          <img
          src={link}
          className="popup__image"
          alt={name}
          />
        }
        <figcaption
          className="popup__image-caption">
            {name}
        </figcaption>
      </figure>
    </Popup>
  )
}

export default ImagePopup;
