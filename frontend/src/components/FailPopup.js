import React from "react";
import InfoTooltip from "./InfoTooltip";

function FailPopup({isOpen, onClose}){
  return(
    <InfoTooltip
      name="fail"
      title="Что-то пошло не так! Попробуйте ещё раз."
      isOpen={isOpen}
      onClose={onClose}>
    </InfoTooltip>
  )
}

export default FailPopup;
