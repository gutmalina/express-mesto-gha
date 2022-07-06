import {useState, useCallback, useEffect} from "react";
import FormRegister from "./FormRegister";
import {Link} from 'react-router-dom';
import ButtonSubmit from "./ButtonSubmit";

function Register({handleRegister, location}){
  const [isContentButton, setIsContentButton] = useState('Зарегистрироваться')
  const [isButtonSubmitValid, setIsButtonSubmitValid] = useState(true)
  const [isInputEmail, setIsInputEmail] = useState(true)
  const [isInputPassword, setIsInputPassword] = useState(true)
  const [isRegisterDate, setIsRegisterDate] = useState({
    email: '',
    password: ''
  })
  const {email, password} = isRegisterDate

/** Получение введенных значений в поля input*/
  const handleChange = useCallback((evt)=>{
    const { name, value } = evt.target
    setIsRegisterDate(prevState=>({...prevState, [name]: value}))
  }, [setIsRegisterDate])

/** disabled кнопки при переходе на страницу */
  useEffect(()=>{
    setIsInputEmail(true)
    setIsInputPassword(true)
  }, [location])

/** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    renderLoading(true);
    handleRegister({
      email,
      password,
      onRenderLoading: ()=>{
        renderLoading(false)
      },
    })
  }

 /** Изменение текста кнопки Submit при ожидании ответа от сервера */
  const renderLoading = (isLoading)=>{
    isLoading ? setIsContentButton('Регистрация...') : setIsContentButton('Зарегистрироваться')
  }

  return(
    <section className="autorization indent__autorization">
      <h2 className="autorization__title">Регистрация</h2>
      <form name="autorization-form"
        className ="form form_autorization"
        onSubmit={handleSubmit}
        noValidate>
        <fieldset className="autorization__contact">
        <FormRegister
          email={email}
          password={password}
          isInputEmail={isInputEmail}
          setIsInputEmail={setIsInputEmail}
          isInputPassword={isInputPassword}
          setIsInputPassword={setIsInputPassword}
          onChange={handleChange}
          setIsButtonSubmitValid={setIsButtonSubmitValid}
        />
        </fieldset>
        <ButtonSubmit
          name="autorization"
          contentButton={isContentButton}
          onIsButtonSubmitValid={isButtonSubmitValid}
        />
      </form>
        <div className="autorization__signin">
          <p className="autorization__subtitle">Уже зарегистрированы?
            <Link
              to="/sign-in"
              className="autorization__login-link"> Войти</Link>
          </p>
        </div>
    </section>
  )
}

export default Register;
