import {useState, useCallback, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import FormMesto from "./FormMesto";

function AddPlacePopup({isOpen, onClose, onAddPlace}){
  const [isButtonSubmitValid, setIsButtonSubmitValid] = useState(true)
  const [isContentButton, setIsContentButton] = useState('Создать')
  const [isInputName, setIsInputName] = useState(true)
  const [isInputLink, setIsInputLink] = useState(true)
  const [isMestoDate, setIsMestoDate] = useState({
    name: '',
    link: ''
  })
  const {name, link} = isMestoDate

/** Получение введенных значений в поля input*/
  const handleChange = useCallback((evt)=>{
    const { name, value } = evt.target
    setIsMestoDate(prevState=>({...prevState, [name]: value}))
  }, [setIsMestoDate])

/** Очистка полей формы и disabled кнопки перед открытием */
  useEffect(()=>{
    setIsMestoDate({
      name: '',
      link: ''
    })
    setIsInputName(true)
    setIsInputLink(true)
    if(!isButtonSubmitValid){
      setIsButtonSubmitValid(true)
    }
  }, [isOpen, setIsMestoDate])

/** Submit, сбор и передача данных новой карточки для отправки на сервер */
  const handleSubmit=(evt)=>{
    evt.preventDefault();
    renderLoading(true);
    onAddPlace({
      name,
      link,
      onRenderLoading: ()=>{
        renderLoading(false)
      },
    });
  }

/** Изменение текста кнопки при ожидании ответа от сервера */
  const renderLoading=(isLoading)=>{
    isLoading ? setIsContentButton('Сохранение...') : setIsContentButton('Создать')
  }

  return(
    <PopupWithForm
      name="mesto"
      title="Новое место"
      contentButton={isContentButton}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonSubmitValid={isButtonSubmitValid}
    >
      <FormMesto
        name={name}
        link={link}
        isInputName={isInputName}
        setIsInputName={setIsInputName}
        isInputLink={isInputLink}
        setIsInputLink={setIsInputLink}
        onChange={handleChange}
        isOpen={isOpen}
        setIsButtonSubmitValid={setIsButtonSubmitValid}
      />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
