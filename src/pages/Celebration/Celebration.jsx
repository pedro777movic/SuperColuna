import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../contexts/ProgressContext';
import { Award, Star, Activity, ArrowRight } from 'lucide-react';
import styles from './Celebration.module.css';

const Celebration = () => {
  const navigate = useNavigate();
  const { testResults, badges } = useContext(ProgressContext);

  const initialScore = testResults ? testResults.answers.dorLombar : 8;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.confetti}>🎉</div>
      
      <header className={styles.header}>
        <Award size={64} className={styles.mainIcon} />
        <h1 className={styles.title}>Parabéns!</h1>
        <p className={styles.subtitle}>Você completou o Desafio 30 Dias Super Coluna.</p>
      </header>

      <div className={styles.statsCard}>
        <h3 className={styles.cardTitle}>Sua Jornada</h3>
        
        <div className={styles.statRow}>
          <div className={styles.statLabel}>
            <Activity size={20} className={styles.statIcon} />
            <span>Dor Lombar Inicial</span>
          </div>
          <span className={styles.statValueBad}>{initialScore}/10</span>
        </div>

        <div className={styles.statRow}>
          <div className={styles.statLabel}>
            <Star size={20} className={styles.statIcon} style={{color: '#fbbf24'}} />
            <span>Conquistas Desbloqueadas</span>
          </div>
          <span className={styles.statValue}>{badges.length}</span>
        </div>
      </div>

      <div className={styles.messageBox}>
        <p>
          "Sua dedicação diária transformou sua mobilidade e construiu uma fundação de proteção para a sua coluna. O hábito foi criado."
        </p>
      </div>

      <button className={styles.primaryButton} onClick={() => navigate('/bonus')}>
        Continuar Minha Evolução <ArrowRight size={20} />
      </button>
      
      <button className={styles.secondaryButton} onClick={() => navigate('/profile')}>
        Ver Meu Certificado
      </button>
    </div>
  );
};

export default Celebration;
