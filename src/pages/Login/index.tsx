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
    <body className={ styles.container }>
      <header className={ styles.header }>
        <img className={ styles.logo } src={ logoRecipes } alt="logo recipes" />
        <img className={ styles.tomato } src={ tomate } alt="tomate" />
        <h2>Login</h2>
      </header>
      <form onSubmit={ handleSubmit }>
        <div>
          <p>email:</p>
          <input
            type="email"
            value={ email }
            data-testid="email-input"
            onChange={ handleEmailChange }
          />
        </div>
        <div>
          <p>senha:</p>
          <input
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ handlePasswordChange }
          />
        </div>
        <button
          onClick={ handleClick }
          type="submit"
          disabled={ !isValid }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    </body>
  );
}

export default Login;
