import React, { useContext, useState } from 'react';
import { ProgressContext } from '../../contexts/ProgressContext';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import { Lock, CheckCircle2, PlayCircle } from 'lucide-react';
import styles from './Program.module.css';

const Program = () => {
  const { days, markExerciseCompleted } = useContext(ProgressContext);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleExerciseClick = (dayIndex, exerciseId) => {
    markExerciseCompleted(dayIndex, exerciseId);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Programa 30 Dias</h1>
        <p className={styles.subtitle}>Siga na ordem para melhor recuperação.</p>
      </header>

      <div className={styles.daysList}>
        {days.map((day, index) => (
          <div 
            key={day.day} 
            className={`${styles.dayCard} ${!day.unlocked ? styles.locked : ''} ${day.completed ? styles.completed : ''}`}
            onClick={() => day.unlocked && setSelectedDay(day.day === selectedDay ? null : day.day)}
          >
            <div className={styles.dayHeader}>
              <div className={styles.dayInfo}>
                <span className={styles.dayNumber}>{day.phase} - Dia {day.day}</span>
                {day.completed && <CheckCircle2 size={16} className={styles.checkIcon} />}
              </div>
              {!day.unlocked && <Lock size={16} className={styles.lockIcon} />}
            </div>

            {selectedDay === day.day && day.unlocked && (
              <div className={styles.exercisesList}>
                <div className={styles.dayObjective}>
                  <strong>Objetivo:</strong> {day.objective}
                </div>
                <div className={styles.dayMessage}>
                  "{day.message}"
                </div>

                {day.exercises.map(exercise => (
                  <div key={exercise.id} className={styles.exerciseItem}>
                    <div className={styles.exerciseContent}>
                      <span className={styles.exerciseTitle}>{exercise.title}</span>
                      <p className={styles.exerciseDesc}>{exercise.description}</p>
                      
                      {/* Placeholder para iframe do YouTube */}
                      <div className={styles.videoPlaceholder}>
                         <PlayCircle size={32} className={styles.playIcon} />
                         <span>Assistir Vídeo ({exercise.videoId})</span>
                      </div>
                    </div>
                    <button 
                      className={`${styles.completeButton} ${exercise.completed ? styles.btnCompleted : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExerciseClick(index, exercise.id);
                      }}
                      disabled={exercise.completed}
                    >
                      {exercise.completed ? 'Concluído' : 'Marcar Concluído'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Program;
