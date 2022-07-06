import {useRef, useEffect} from 'react';

function FormMesto({name, link, onChange, isOpen, setIsButtonSubmitValid, isInputName, setIsInputName, isInputLink, setIsInputLink}){
  const inputNameRef = useRef('')
  const inputLinkRef = useRef('')

/**проверка валидности input */
  useEffect(()=>{
    if(isOpen){
      setIsInputName(inputNameRef.current.validity.valid);
    }
  }, [name])

  useEffect(()=>{
    if(isOpen){
      setIsInputLink(inputLinkRef.current.validity.valid)
    }
  }, [link])

/** изменение стиля если невалидно */
  const classNameInputName = `popup__input popup__input_foto_name ${!isInputName ? 'popup__input_type_error' : ''}`
  const classNameInputLink = `popup__input popup__input_foto_link ${!isInputLink ? 'popup__input_type_error' : ''}`
  const classNameSpanName = `span ${!isInputName ? 'span_active' : ''}`
  const classNameSpanLink = `span ${!isInputLink ? 'span_active' : ''}`
  const isTextSpanName = `${!isInputName ? inputNameRef.current.validationMessage : ''}`
  const isTextSpanLink = `${!isInputLink ? inputLinkRef.current.validationMessage : ''}`

/** изменить состояние кнопки Submit в зависимости от валидности input*/
  useEffect(()=>{
    if(isOpen){
      if(inputNameRef.current.validity.valid && inputLinkRef.current.validity.valid){
        setIsButtonSubmitValid(false)
      }else{
        setIsButtonSubmitValid(true)
      }
    }
  }, [name, link])

  return(
    <>
      <input id="name-mesto"
        type="text"
        name="name"
        value={name || ''}
        onChange={onChange}
        placeholder="Название"
        className={classNameInputName}
        minLength="2"
        maxLength="30"
        autoFocus
        required
        ref={inputNameRef}
      />
      <div className="indent__span">
        <span
          className={classNameSpanName}>
            {isTextSpanName}
        </span>
      </div>
      <input id="url-mesto"
        type="url"
        name="link"
        value={link || ''}
        onChange={onChange}
        placeholder="Ссылка на картинку"
        className={classNameInputLink}
        required
        ref={inputLinkRef}
      />
      <div className="indent__span">
        <span
          className={classNameSpanLink}>
            {isTextSpanLink}
        </span>
      </div>
    </>
  )
}

export default FormMesto;
