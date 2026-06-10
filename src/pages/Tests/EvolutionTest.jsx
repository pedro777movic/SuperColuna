import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../contexts/ProgressContext';
import { Activity, Calendar, Target, CheckCircle2 } from 'lucide-react';
import styles from './Tests.module.css';

const EvolutionTest = () => {
  const navigate = useNavigate();
  const { testResults, checkins, days } = useContext(ProgressContext);

  const completedDaysCount = days.filter(d => d.completed).length;

  if (!testResults) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.emptyState}>
          <h2>Nenhum teste inicial encontrado.</h2>
          <button className={styles.primaryButton} onClick={() => navigate('/initial-test')}>
            Fazer Teste Inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Relatório de Evolução</h1>
        <p className={styles.subtitle}>Acompanhe o que mudou desde o seu primeiro dia.</p>
      </header>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryBox}>
          <Calendar size={24} className={styles.iconPrimary} />
          <span className={styles.summaryValue}>{completedDaysCount}</span>
          <span className={styles.summaryLabel}>Dias Concluídos</span>
        </div>
        <div className={styles.summaryBox}>
          <CheckCircle2 size={24} className={styles.iconSuccess} />
          <span className={styles.summaryValue}>{checkins.length}</span>
          <span className={styles.summaryLabel}>Check-ins</span>
        </div>
      </div>

      <div className={styles.comparisonCard}>
        <h3 className={styles.comparisonTitle}>Situação Inicial vs Atual</h3>
        <p className={styles.comparisonSubtitle}>Média de dor lombar reportada</p>
        <div className={styles.barChart}>
          <div className={styles.barRow}>
            <span>Teste Inicial: {testResults.answers.dorLombar}/10</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: `${testResults.answers.dorLombar * 10}%`, backgroundColor: '#ef4444' }}></div>
            </div>
          </div>
          <div className={styles.barRow}>
            <span>Sensação Atual (Último Check-in):</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: '30%', backgroundColor: 'var(--color-success)' }}></div>
            </div>
          </div>
        </div>
        <p className={styles.motivationalText}>
          "O movimento consistente está reduzindo sua percepção de dor. Continue seguindo o programa!"
        </p>
      </div>

      <button className={styles.primaryButton} onClick={() => navigate('/')}>
        Voltar para Home
      </button>
    </div>
  );
};

export default EvolutionTest;
