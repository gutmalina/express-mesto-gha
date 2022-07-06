import {useEffect, useState} from 'react';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import SuccessPopup from './SuccessPopup';
import FailPopup from './FailPopup';
import {Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import *as auth from '../utils/Auth';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [selectedCard, setSelectedCard] = useState('')
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false)
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false)
  const [isFailPopupOpen, setIsFailPopupOpen] = useState(false)
  const [cards, setCards] = useState([])
  const [cardDelete, setCardDelete] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const [isEmailAuth, setIsEmailAuth] = useState('')

/** Загрузка страницы, получение данных профиля и массив карточек */
  useEffect(()=>{
    if(loggedIn){
      Promise.all([api.getProfile(), api.getCards()])
        .then(([res, cards]) => {
          setCurrentUser(res)
          setCards(cards)
        })
        .catch(console.log)
    }
  }, [loggedIn])

/** Отправка новых данных профиля на сервер и обновление на странице */
  const handleUpdateUser=(updateUser)=>{
    api.editProfile(updateUser.name, updateUser.about)
      .then(res => {
        setCurrentUser(res)
        setIsEditProfilePopupOpen(false)
      })
      .catch(console.log)
      .finally(()=>{
        updateUser.onRenderLoading(false)
      })
  }

/** Отправка аватара на сервер и обновление на странице */
  const handleUpdateAvatar=(updateAvatar)=>{
    api.editAvatar(updateAvatar.avatar)
      .then(res => {
        setCurrentUser(res)
        setIsEditAvatarPopupOpen(false)
      })
      .catch(console.log)
      .finally(()=>{
        updateAvatar.onRenderLoading(false)
      })
  }

/** Отправка новой карточки на сервер и обновление на странице */
  const handleAddPlace=(newCard)=>{
    api.addCard(newCard.name, newCard.link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false)
      })
      .catch(console.log)
      .finally(()=>{
        newCard.onRenderLoading(false)
      })
  }

/** Поставить лайк или дизлайк карточке */
  const handleCardLike=(card)=>{
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    if(!isLiked){
      api.addLike(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.log)
      }else{
        api.deleteLike(card._id)
          .then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
          })
          .catch(console.log)
      }
  }

/** Удалить карточку */
  const handleCardDelete=(obj)=>{
    api.deleteCard(cardDelete._id)
      .then(res => {
        setCards((cards) => cards.filter((c) => c._id !== cardDelete._id))
        setIsConfirmDeletePopupOpen(false)
      })
      .catch(console.log)
      .finally(()=>{
        obj.onRenderLoading(false)
      })
  }

/**Регистрация пользователя */
  const handleRegister =(updateRegister)=>{
    return auth.register(updateRegister.email, updateRegister.password)
    .then(()=>{
      setIsSuccessPopupOpen(true)
      history.push('/sign-in')
    })
    .catch(console.log)
    .finally(()=>{
      updateRegister.onRenderLoading(false)
    })
  }

/**Авторизация пользователя */
  const handleLogin = (updateLogin)=>{
    return auth.authorize(updateLogin.email, updateLogin.password)
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token)
        tokenCheck(updateLogin.email);
      }
      setIsEmailAuth(updateLogin.email)
    })
    .catch(()=>{
      setIsFailPopupOpen(true)
    })
    .finally(()=>{
      updateLogin.onRenderLoading(false)
    })
  }

/** получение токена */
  const tokenCheck = () => {
    let jwt = localStorage.getItem('jwt')
    if(jwt){
      auth.getContent(jwt)
      .then((res) => {
        if (res){
          setIsEmailAuth(res.data.email)
          setLoggedIn(true);
        }
      })
      .catch(console.log)
    }
  }

/**выход */
  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

/**использование токена при возврате на сайт */
  useEffect(() => {
    tokenCheck();
  }, [])

/** переход на страницу с карточками после авторизации */
  useEffect(() => {
      if (loggedIn) {
        history.push('/');
      }
  }, [loggedIn])

/** Открыть попапы */
  const handleEditProfileClick = ()=>{
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = ()=>{
    setIsAddPlacePopupOpen(true)
  }

  const handleEditAvatarClick = ()=>{
    setIsEditAvatarPopupOpen(true)
  }

  const handleConfirmDeleteClick = (card)=>{
    setIsConfirmDeletePopupOpen(true)
    setCardDelete(card)
  }

  const handleCardClick = (card)=>{
    setSelectedCard(card)
  }

/** Закрыть попап */
  const closeAllPopups=()=>{
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmDeletePopupOpen(false)
    setIsSuccessPopupOpen(false)
    setIsFailPopupOpen(false)
    setSelectedCard('')
  }

/* Установить текущий год дя footer */
  const getYear=()=>{
    return new Date().getFullYear();
  }

  return (
    <div className="App body">
      <div className="page indent__page">
        <CurrentUserContext.Provider
          value={currentUser}>
          <Header
            signOut={signOut}
            onEmail={isEmailAuth}/>
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}>
              <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardDelete={handleConfirmDeleteClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
              />
            </ProtectedRoute>
            <Route path="/sign-in">
              <Login
                handleLogin={handleLogin}
                location={location}/>
            </Route>
            <Route path="/sign-up">
              <Register
                handleRegister={handleRegister}
                location={location}/>
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          { location.pathname === '/' &&
              <Footer date={getYear()}/>
          }
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
          />
          <ImagePopup
             onClose={closeAllPopups}
             card={selectedCard}
          />
          <SuccessPopup
            isOpen={isSuccessPopupOpen}
            onClose={closeAllPopups}
          />
          <FailPopup
            isOpen={isFailPopupOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
