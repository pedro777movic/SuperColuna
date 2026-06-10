import React, { useContext } from 'react';
import { ProgressContext } from '../../contexts/ProgressContext';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import { Award, Lock } from 'lucide-react';
import styles from './Gamification.module.css';

const Gamification = () => {
  const { badges } = useContext(ProgressContext);

  const allPossibleBadges = [
    { id: 'b1', title: 'Primeiro Passo', desc: 'Concluiu o 1º dia!' },
    { id: 'b3', title: 'Foco Inicial', desc: '3 dias concluídos.' },
    { id: 'b7', title: 'Uma Semana!', desc: '7 dias seguidos.' },
    { id: 'b15', title: 'Metade do Caminho', desc: '15 dias concluídos.' },
    { id: 'b21', title: 'Novo Hábito', desc: '21 dias concluídos.' },
    { id: 'b30', title: 'Coluna Nova!', desc: 'Programa 30D finalizado.' },
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Minhas Conquistas</h1>
        <p className={styles.subtitle}>Sua evolução merece ser celebrada.</p>
      </header>

      <div className={styles.badgesGrid}>
        {allPossibleBadges.map(badgeDef => {
          const isUnlocked = badges.find(b => b.id === badgeDef.id);
          return (
            <div key={badgeDef.id} className={`${styles.badgeCard} ${isUnlocked ? styles.unlocked : styles.locked}`}>
              <div className={styles.iconContainer}>
                {isUnlocked ? <Award size={32} className={styles.awardIcon} /> : <Lock size={24} className={styles.lockIcon} />}
              </div>
              <span className={styles.badgeTitle}>{badgeDef.title}</span>
              <span className={styles.badgeDesc}>{badgeDef.desc}</span>
            </div>
          );
        })}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Gamification;
