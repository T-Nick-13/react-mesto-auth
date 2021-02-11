import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header.js';

function Login({handleLogin}) {

  const [data, setData] = useState({
    email: '',
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
  }

  return(
    <div className="page-auth">
      <Header headerRoute="/sign-up" headerLink="Регистрация" />
      <div className="auth">
        <p className="auth__heading">Вход</p>
        <form onSubmit={handleSubmit} className="auth__form">
          <input id="email" className="auth__input" required name="email" type="email"
            value={data.username} onChange={handleChange} placeholder="Email" />
          <input id="password" className="auth__input" required name="password" type="password"
            value={data.password} onChange={handleChange} placeholder="Пароль" />
          <button type="submit" className="auth__btn">Войти</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
