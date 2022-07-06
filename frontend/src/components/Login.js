import {useState, useCallback, useEffect} from "react";
import FormLogin from "./FormLogin";
import ButtonSubmit from "./ButtonSubmit";

function Login({handleLogin, location}){
  const [isContentButton, setIsContentButton] = useState('Войти')
  const [isButtonSubmitValid, setIsButtonSubmitValid] = useState(true)
  const [isInputEmail, setIsInputEmail] = useState(true)
  const [isInputPassword, setIsInputPassword] = useState(true)
  const [isLoginDate, setIsLoginDate] = useState({
    email: '',
    password: ''
  })
  const {email, password} = isLoginDate

/** Получение введенных значений в поля input*/
  const handleChange = useCallback((evt)=>{
    const { name, value } = evt.target
    setIsLoginDate(prevState=>({...prevState, [name]: value}))
  }, [setIsLoginDate])

/** disabled кнопки при переходе на страницу */
  useEffect(()=>{
    setIsInputEmail(true)
    setIsInputPassword(true)
  }, [location])

/** Submit */
  const handleSubmit = (evt)=>{
    evt.preventDefault();
    renderLoading(true);
    handleLogin({
      email,
      password,
      onRenderLoading: ()=>{
        renderLoading(false)
      },
    })
  }

/** Изменение текста кнопки Submit при ожидании ответа от сервера */
  const renderLoading = (isLoading)=>{
    isLoading ? setIsContentButton('Вход...') : setIsContentButton('Войти')
  }

  return(
    <>
      <section className="autorization indent__autorization">
        <h2 className="autorization__title">Вход</h2>
        <form name="autorization-form"
          className ="form form_autorization"
          onSubmit={handleSubmit}
          noValidate>
          <fieldset className="autorization__contact">
          <FormLogin
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
      </section>
    </>
  )
}

export default Login;
