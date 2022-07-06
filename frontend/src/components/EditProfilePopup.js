import React, {useState, useEffect, useCallback} from 'react';
import PopupWithForm from "./PopupWithForm";
import FormProfile from "./FormProfile";
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}){
  const currentUser = React.useContext(CurrentUserContext)
  const [isContentButton, setIsContentButton] = useState('Сохранить')
  const [isButtonSubmitValid, setIsButtonSubmitValid] = useState(true)
  const [isInputName, setIsInputName] = useState(true)
  const [isInputDescription, setIsInputDescription] = useState(true)
  const [isProfileDate, setIsProfileDate] = useState({
    name: '',
    description: ''
  })
  const {name, description} = isProfileDate

/** Получение введенных значений в поля input*/
  const handleChange = useCallback((evt)=>{
    const { name, value } = evt.target
    setIsProfileDate(prevState=>({...prevState, [name]: value}))
  }, [setIsProfileDate])

/** Подстановка данных пользователя из контекста в поля формы, disabled при открытии Popup */
  useEffect(() => {
    setIsProfileDate({
      name: currentUser.name,
      description: currentUser.about})
    setIsInputName(true)
    setIsInputDescription(true)
    if(!isButtonSubmitValid){
      setIsButtonSubmitValid(true)
    }
  }, [isOpen, currentUser]);

/** Submit, сбор и передача данных профиля для отправки на сервер */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    renderLoading(true);
    onUpdateUser({
      name,
      about: description,
      onRenderLoading: ()=>{
        renderLoading(false)
      },
    });
  }

/** Изменение текста кнопки Submit при ожидании ответа от сервера */
  const renderLoading = (isLoading)=>{
    isLoading ? setIsContentButton('Сохранение...') : setIsContentButton('Сохранить')
  }

  return(
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      contentButton={isContentButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonSubmitValid={isButtonSubmitValid}
    >
      <FormProfile
        name={name || ''}
        description={description || ''}
        isInputName={isInputName}
        setIsInputName={setIsInputName}
        isInputDescription={isInputDescription}
        setIsInputDescription={setIsInputDescription}
        onChange={handleChange}
        isOpen={isOpen}
        setIsButtonSubmitValid={setIsButtonSubmitValid}

      />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
