import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header.js';

function Login({handleLogin}) {

  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const history = useHistory();

  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(data)
      .then(() => history.push('/'))
      .catch((err) => {console.log(err)});
  }


  return(
    <>
      <Header headerRoute="/signin" headerLink="Регистрация" />

      <div className="auth">
        <p className="auth__heading">Вход</p>

        <form onSubmit={handleSubmit} className="auth__form">
          <input id="username" className="auth__input" required name="username" type="text"
            value={data.username} onChange={handleChange} placeholder="Email" />
          <input id="password" className="auth__input" required name="password" type="password"
            value={data.password} onChange={handleChange} placeholder="Пароль" />
          <button type="submit" className="auth__btn">Войти</button>
        </form>
      </div>

    </>

  )
}

export default Login;
