import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tomate from '../../images/tomate.svg';
import logoRecipes from '../../images/logo Recipes App.svg';
import styles from './login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateForm(newEmail, password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validateForm(email, newPassword);
  };

  const validateForm = (newEmail: string, newPassword: string) => {
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newEmail);
    const isPasswordValid = newPassword.length > 6;
    setIsValid(isEmailValid && isPasswordValid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
  };
  function handleClick() {
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/meals');
  }

  return (
    <div className={ styles.container }>
      <header className={ styles.header }>
        <img className={ styles.logo } src={ logoRecipes } alt="logo recipes" />
        <img className={ styles.tomato } src={ tomate } alt="tomate" />
      </header>
      <form
        className={ styles.form }
        onSubmit={ handleSubmit }
      >
        <h1 className={ styles.h1 }>Login</h1>
        <div>
          <input
            type="email"
            value={ email }
            data-testid="email-input"
            onChange={ handleEmailChange }
            placeholder="Email"
          />
        </div>
        <div>
          <input
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ handlePasswordChange }
            placeholder="Password"
          />
        </div>
        <button
          onClick={ handleClick }
          type="submit"
          disabled={ !isValid }
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
