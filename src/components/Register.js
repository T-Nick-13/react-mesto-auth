import React, { useState } from 'react';
import logoPath from '../images/logo.svg';
import { withRouter, useHistory } from 'react-router-dom';

function Register({onRegister}) {

  const [data, setData] = useState({
    email: '',
    password: ''
  });

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
    onRegister(data)
      .then(() => {
        history.push('/sign-in')
      })
      .catch(() => {});
  }


  return(
    <div className="login">
      <div className="login__header">
        <img className="login__logo" src={logoPath} alt="Лого Mesto"/>
        <p className="login__nav">Регистрация</p>
      </div>

      <p className="login__welcome">Вход</p>

      <form onSubmit={handleSubmit} className="login__form">
        <input id="username" required name="username" type="text" value={data.username} onChange={handleChange} />
        <input id="password" required name="password" type="password" value={data.password} onChange={handleChange} />
          <div className="login__button-container">
            <button type="submit" className="login__link">Войти</button>
          </div>
      </form>


    </div>
  )
}

export default Register;
