import {useState} from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({isOpen, onClose, onCardDelete}){
  const [isContentButton, setIsContentButton] = useState('Да')

/** Submit удаления карточки на сервере */
  const handleSubmit=(evt)=>{
    evt.preventDefault();
    renderLoading(true)
    onCardDelete({
      onRenderLoading: ()=>{
        renderLoading(false)
      },
    })
  }

/** Изменение текста кнопки при ожидании ответа от сервера */
  const renderLoading=(isLoading)=>{
    isLoading ? setIsContentButton('Удаление...') : setIsContentButton('Да')
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      contentButton={isContentButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmDeletePopup;
