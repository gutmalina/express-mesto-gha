export const BASE_URL = 'https://auth.nomoreparties.co';

/** проверить ответ сервера и получить ошибку*/
const checkResponse = (res)=>{
  if(res.ok){
    return res.json()
  }
  return res.json()
    .then((data)=>{
      throw new Error(data.message)
    })
}

/**Регистрация пользователя */
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  .then(checkResponse)
};

/**Авторизация пользователя */
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  .then(checkResponse)
};

/**проверка тонкена */
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  .then(checkResponse)
}
