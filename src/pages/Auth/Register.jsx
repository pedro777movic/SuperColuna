import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Auth.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      alert('Erro ao fazer cadastro');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Criar Conta</h1>
        <p className={styles.subtitle}>Inicie sua jornada de recuperação hoje.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="text" 
            placeholder="Seu nome" 
            value={name}
            onChange={e => setName(e.target.value)}
            className={styles.input}
            required
          />
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
          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
        
        <p className={styles.linkText} onClick={() => navigate('/login')}>
          Já tem conta? Faça login
        </p>
      </div>
    </div>
  );
};

export default Register;
