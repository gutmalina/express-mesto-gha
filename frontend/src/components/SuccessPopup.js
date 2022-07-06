import React from "react";
import InfoTooltip from "./InfoTooltip";

function SuccessPopup({isOpen, onClose}){
  return(
    <InfoTooltip
      name="success"
      title="Вы успешно зарегистрировались!"
      isOpen={isOpen}
      onClose={onClose}>
    </InfoTooltip>
  )
}

export default SuccessPopup;
