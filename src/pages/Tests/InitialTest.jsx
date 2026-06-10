import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../contexts/ProgressContext';
import styles from './Tests.module.css';

const InitialTest = () => {
  const navigate = useNavigate();
  const { saveTestResult } = useContext(ProgressContext);

  const questions = [
    { id: 'dorLombar', label: 'Qual seu nível de dor lombar geral?' },
    { id: 'dorAcordar', label: 'Nível de dor ao acordar:' },
    { id: 'dorSentado', label: 'Nível de dor ao ficar sentado:' },
    { id: 'dorCaminhar', label: 'Nível de dor ao caminhar:' },
    { id: 'rigidez', label: 'Nível de rigidez matinal:' },
    { id: 'abaixar', label: 'Dificuldade para abaixar:' },
    { id: 'travamento', label: 'Sensação de travamento:' },
    { id: 'mobilidade', label: 'Mobilidade geral (0 é péssima, 10 é excelente):' },
  ];

  const [answers, setAnswers] = useState({});

  const handleSelect = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Por favor, responda todas as perguntas.');
      return;
    }
    
    // Save to context
    saveTestResult({
      date: new Date().toISOString(),
      type: 'initial',
      answers
    });
    
    navigate('/');
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Avaliação Inicial</h1>
        <p className={styles.subtitle}>Responda de 0 a 10 para avaliarmos seu ponto de partida.</p>
      </header>

      <div className={styles.questionsList}>
        {questions.map(q => (
          <div key={q.id} className={styles.questionCard}>
            <span className={styles.questionLabel}>{q.label}</span>
            <div className={styles.scaleContainer}>
              {[0,1,2,3,4,5,6,7,8,9,10].map(num => (
                <button
                  key={num}
                  className={`${styles.scaleButton} ${answers[q.id] === num ? styles.scaleActive : ''}`}
                  onClick={() => handleSelect(q.id, num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className={styles.primaryButton} onClick={handleSubmit}>
        Salvar Avaliação
      </button>
    </div>
  );
};

export default InitialTest;
