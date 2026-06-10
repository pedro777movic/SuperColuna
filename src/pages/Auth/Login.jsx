import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Auth.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Super Coluna</h1>
        <p className={styles.subtitle}>Seu progresso começa hoje.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="email" 
            placeholder="Seu e-mail" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input 
            type="password" 
            placeholder="Sua senha" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Entrar</button>
        </form>
        
        <p className={styles.linkText} onClick={() => navigate('/register')}>
          Ainda não tem conta? Cadastre-se
        </p>
      </div>
    </div>
  );
};

export default Login;
