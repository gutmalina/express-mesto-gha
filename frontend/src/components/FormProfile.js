import {useEffect, useRef} from 'react';

function FormProfile({ name, description, isInputName, setIsInputName, isInputDescription, setIsInputDescription, onChange, isOpen, setIsButtonSubmitValid}){
  const inputNameRef = useRef(true)
  const inputDescriptionRef = useRef(true)

/**проверка валидности input */
  useEffect(()=>{
    if(isOpen){
      setIsInputName(inputNameRef.current.validity.valid);
    }
  }, [name])

  useEffect(()=>{
    if(isOpen){
      setIsInputDescription(inputDescriptionRef.current.validity.valid)
    }
  }, [description])

/** изменение стиля если невалидно */
  const classNameInputName = `popup__input popup__input_edit_name ${!isInputName ? 'popup__input_type_error' : ''}`
  const classNameInputDescription = `popup__input popup__input_edit_job ${!isInputDescription ? 'popup__input_type_error' : ''}`
  const classNameSpanName = `span ${!isInputName ? 'span_active' : ''}`
  const classNameSpanDescription = `span ${!isInputDescription ? 'span_active' : ''}`
  const isTextSpanName = `${!isInputName ? inputNameRef.current.validationMessage : ''}`
  const isTextSpanDescription = `${!isInputDescription ? inputDescriptionRef.current.validationMessage : ''}`

/** изменить состояние кнопки Submit в зависимости от валидности input*/
  useEffect(()=>{
    if(isOpen){
      if(inputNameRef.current.validity.valid && inputDescriptionRef.current.validity.valid){
        setIsButtonSubmitValid(false)
      }else{
        setIsButtonSubmitValid(true)
      }
    }
  }, [name, description])

  return(
    <>
      <input id="name-profile"
        value={name || ''}
        onChange={onChange}
        type="text"
        name="name"
        placeholder="Имя"
        className={classNameInputName}
        minLength="2"
        maxLength="40"
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
      <input id="description-profile"
        value={description || ''}
        onChange={onChange}
        type="text"
        name="description"
        placeholder="О себе"
        className={classNameInputDescription}
        minLength="2"
        maxLength="200"
        required
        ref={inputDescriptionRef}
      />
      <div className="indent__span">
        <span
          className={classNameSpanDescription}>
            {isTextSpanDescription}
        </span>
      </div>
    </>
  )
}

export default FormProfile;
