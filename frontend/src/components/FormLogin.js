import {useRef, useEffect} from "react";

function FormLogin({email, password, isInputEmail, setIsInputEmail, isInputPassword, setIsInputPassword, onChange, setIsButtonSubmitValid}){
  const inputEmailRef = useRef('')
  const inputPasswordRef = useRef('')

/**проверка валидности input */
  useEffect(()=>{
    if(email !== ''){
      setIsInputEmail(inputEmailRef.current.validity.valid);
    }
  }, [email])

  useEffect(()=>{
    if(password !== ''){
      setIsInputPassword(inputPasswordRef.current.validity.valid)
    }
  }, [password])

/** изменение стиля если невалидно */
  const classNameInputEmail = `autorization__input autorization__input_email ${!isInputEmail ? 'autorization__input_type_error' : ''}`
  const classNameInputPassword = `autorization__input autorization__input_password ${!isInputPassword ? 'autorization__input_type_error' : ''}`
  const classNameSpanEmail = `span ${!isInputEmail ? 'span_active' : ''}`
  const classNameSpanPassword = `span ${!isInputPassword ? 'span_active' : ''}`
  const isTextSpanEmail = `${!isInputEmail ? inputEmailRef.current.validationMessage : ''}`
  const isTextSpanPassword = `${!isInputPassword ? inputPasswordRef.current.validationMessage : ''}`

/** изменить состояние кнопки Submit в зависимости от валидности input*/
  useEffect(()=>{
    if(email !== '' && password !== ''){
      if(inputEmailRef.current.validity.valid && inputPasswordRef.current.validity.valid){
        setIsButtonSubmitValid(false)
      }else{
        setIsButtonSubmitValid(true)
      }
    }
  }, [email, password])

  return(
    <>
      <input id="email-autorization"
          type="email"
          name="email"
          placeholder="Email"
          ref={inputEmailRef}
          value={email || ''}
          onChange={onChange}
          className={classNameInputEmail}
          autoFocus
          required
          autoComplete="new-email"
        />
        <div className="indent__span">
          <span
            className={classNameSpanEmail}>
              {isTextSpanEmail}
          </span>
        </div>
        <input id="password-autorization"
          type="password"
          name="password"
          placeholder="Пароль"
          ref={inputPasswordRef}
          value={password || ''}
          onChange={onChange}
          className={classNameInputPassword}
          required
          autoComplete="new-password"
        />
        <div className="indent__span">
          <span
            className={classNameSpanPassword}>
              {isTextSpanPassword}
          </span>
        </div>
    </>
  )
}

export default FormLogin;
