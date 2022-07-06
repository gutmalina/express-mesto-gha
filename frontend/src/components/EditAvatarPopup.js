import {useCallback, useEffect, useRef, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import FormAvatar from "./FormAvatar";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
  const imageRef = useRef('')
  const [isButtonSubmitValid, setIsButtonSubmitValid] = useState(true)
  const [isContentButton, setIsContentButton] = useState('Сохранить')
  const [isInputLink, setIsInputLink] = useState(true)
  const [isAvatarDate, setIsAvatarDate] = useState({
    link: ''
  })
  const {link} = isAvatarDate

/** Получение введенных значений в поля input*/
  const handleChange = useCallback((evt)=>{
    const { name, value } = evt.target
    setIsAvatarDate(prevState=>({...prevState, [name]: value}))
  }, [setIsAvatarDate])

/** Очистка полей формы и disabled кнопки перед открытием */
  useEffect(()=>{
    setIsAvatarDate({
      link: ''
    })
    setIsInputLink(true)
    if(!isButtonSubmitValid){
      setIsButtonSubmitValid(true)
    }
  }, [isOpen, setIsAvatarDate])

/** Submit, и передача нового аватара для отправки на сервер */
  const handleSubmit=(evt)=>{
    evt.preventDefault();
    renderLoading(true);
    onUpdateAvatar({
      avatar: imageRef.current.value,
      onRenderLoading: ()=>{
        renderLoading(false)
      },
    });
  }

/** Изменение текста кнопки при ожидании ответа от сервера */
  const renderLoading=(isLoading)=>{
    isLoading ? setIsContentButton('Сохранение...') : setIsContentButton('Сохранить')
  }

  return(
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      contentButton={isContentButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonSubmitValid={isButtonSubmitValid}
    >
      <FormAvatar
        imageRef={imageRef}
        link={link || ''}
        isInputLink={isInputLink}
        setIsInputLink={setIsInputLink}
        onChange={handleChange}
        isOpen={isOpen}
        setIsButtonSubmitValid={setIsButtonSubmitValid}
      />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;


