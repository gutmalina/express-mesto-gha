import React from "react";

function ButtonClose({onClose}){
  return(
    <button type="button"
      className="button button__close button_style_close"
      aria-label="Закрыть"
      onClick={onClose}>
    </button>
  )
}

export default ButtonClose;
