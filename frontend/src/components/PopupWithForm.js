import React from "react";
import Popup from "./Popup";
import ButtonSubmit from "./ButtonSubmit";

function PopupWithForm({name, title, contentButton, isOpen, onClose, children, onSubmit, isButtonSubmitValid}){

  return(
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}>
      <div className="popup__container">
        <h2
          className="popup__title">
            {title}
        </h2>
        <form
          name={`${name}-form`}
          className ={`form form_${name }`}
          onSubmit={onSubmit}
          noValidate>
          <fieldset className="popup__contact">
            {children}
          </fieldset>
          <ButtonSubmit
            name={name}
            contentButton={contentButton}
            onIsButtonSubmitValid={isButtonSubmitValid}
          />
        </form>
      </div>
    </Popup>
  )
}

export default PopupWithForm;
