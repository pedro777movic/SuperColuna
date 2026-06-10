import React, { useContext, useState, useEffect } from 'react';
import { ProgressContext } from '../../contexts/ProgressContext';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import { Lock } from 'lucide-react';
import styles from './Gamification.module.css';

const BADGE_VISUALS = {
  b1:  { emoji: '🏅', color: '#10b981' },
  b3:  { emoji: '🔥', color: '#f59e0b' },
  b7:  { emoji: '💪', color: '#3b82f6' },
  b15: { emoji: '⭐', color: '#8b5cf6' },
  b21: { emoji: '🎯', color: '#ec4899' },
  b30: { emoji: '🏆', color: '#d97706' },
};

const Gamification = () => {
  const { badges } = useContext(ProgressContext);
  const [justUnlocked, setJustUnlocked] = useState(null);

  const allPossibleBadges = [
    { id: 'b1', title: 'Primeiro Passo', desc: 'Concluiu o 1º dia!' },
    { id: 'b3', title: 'Foco Inicial', desc: '3 dias concluídos.' },
    { id: 'b7', title: 'Uma Semana!', desc: '7 dias seguidos.' },
    { id: 'b15', title: 'Metade do Caminho', desc: '15 dias concluídos.' },
    { id: 'b21', title: 'Novo Hábito', desc: '21 dias concluídos.' },
    { id: 'b30', title: 'Coluna Nova!', desc: 'Programa 30D finalizado.' },
  ];

  // Detect newly unlocked badges for animation
  const [prevBadgeCount, setPrevBadgeCount] = useState(badges.length);
  useEffect(() => {
    if (badges.length > prevBadgeCount) {
      const newest = badges[badges.length - 1];
      setJustUnlocked(newest.id);
      const timer = setTimeout(() => setJustUnlocked(null), 2000);
      setPrevBadgeCount(badges.length);
      return () => clearTimeout(timer);
    }
  }, [badges.length, prevBadgeCount]);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerEmoji}>🏆</div>
        <h1 className={styles.title}>Minhas Conquistas</h1>
        <p className={styles.subtitle}>Sua evolução merece ser celebrada.</p>
        <div className={styles.badgeCount}>
          <span className={styles.badgeCountNum}>{badges.length}</span>
          <span className={styles.badgeCountLabel}>de {allPossibleBadges.length} conquistadas</span>
        </div>
      </header>

      <div className={styles.badgesGrid}>
        {allPossibleBadges.map(badgeDef => {
          const isUnlocked = badges.find(b => b.id === badgeDef.id);
          const visual = BADGE_VISUALS[badgeDef.id];
          const isNew = justUnlocked === badgeDef.id;

          return (
            <div
              key={badgeDef.id}
              className={`${styles.badgeCard} ${isUnlocked ? styles.unlocked : styles.locked} ${isNew ? styles.justUnlocked : ''}`}
            >
              <div
                className={styles.iconContainer}
                style={isUnlocked ? { background: `${visual.color}18` } : {}}
              >
                {isUnlocked ? (
                  <span className={styles.badgeEmoji}>{visual.emoji}</span>
                ) : (
                  <Lock size={22} className={styles.lockIcon} />
                )}
              </div>
              <span className={styles.badgeTitle}>{badgeDef.title}</span>
              <span className={styles.badgeDesc}>{badgeDef.desc}</span>
              {isUnlocked && (
                <span className={styles.badgeDate}>
                  {new Date(isUnlocked.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Gamification;
