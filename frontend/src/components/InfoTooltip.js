import React from "react";
import Popup from "./Popup";

function InfoTooltip({name, isOpen, onClose, title}){
  const classNameImage = `popup__image-${name}`

  return(
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}>
      <div className="popup__container popup__container-success">
        <img className={classNameImage}/>
        <h2
          className="popup__title popup__title-success">
            {title}
        </h2>
      </div>
    </Popup>
  )
}

export default InfoTooltip
