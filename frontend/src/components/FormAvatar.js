import {useEffect} from 'react';

function FormAvatar({imageRef, link, isInputLink, setIsInputLink, onChange, isOpen, setIsButtonSubmitValid}){

/**проверка валидности input */
  useEffect(()=>{
    if(isOpen){
      setIsInputLink(imageRef.current.validity.valid)
    }
  }, [link])

/** изменение стиля если невалидно */
  const classNameInputLink = `popup__input popup__input_foto_link ${!isInputLink ? 'popup__input_type_error' : ''}`
  const classNameSpanLink = `span ${!isInputLink ? 'span_active' : ''}`
  const isTextSpanLink = `${!isInputLink ? imageRef.current.validationMessage : ''}`

/** изменить состояние кнопки Submit в зависимости от валидности input*/
  useEffect(()=>{
    if(isOpen){
      if(imageRef.current.validity.valid){
        setIsButtonSubmitValid(false)
      }else{
        setIsButtonSubmitValid(true)
      }
    }
  }, [link])

  return(
    <>
      <input id="url-avatar"
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        className={classNameInputLink}
        ref={imageRef}
        value={link || ''}
        onChange={onChange}
        autoFocus
        required
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

export default FormAvatar;
