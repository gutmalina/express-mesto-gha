import {useEffect, useRef} from "react";
import ButtonClose from "./ButtonClose";

function Popup({name, isOpen, onClose, children, card}){
  const isOpenPopup = isOpen || card
  const className = `popup popup_type_${name} ${name === "image" ? 'popup_theme_dark' : 'popup_theme_light'} ${isOpenPopup ? 'popup_opened' : ''}`
  const popupRef = useRef('')

/** Закрыть попап по оверлею, ESC */
  useEffect(()=>{
    const handleClickOverlay=(evt)=>{
      isOpenPopup && evt.target === popupRef.current && onClose()
    }
    const handleEscClose=(evt)=>{
      evt.key === 'Escape' && isOpenPopup && onClose()
    }
    document.addEventListener('mousedown', handleClickOverlay);
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('mousedown', handleClickOverlay);
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpenPopup])

  return(
    <div
      className={className}
      ref={popupRef}>
      <ButtonClose
        onClose={onClose}>
      </ButtonClose>
      {children}
    </div>
  )
}

export default Popup;
