import React, { useState } from 'react';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import { PlayCircle, Briefcase, Car, Armchair, Sunrise, Moon, ChevronDown } from 'lucide-react';
import styles from './Bonus.module.css';

const Bonus = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const bonusCategories = [
    {
      id: 'escritorio',
      title: 'Alongamentos para Escritório',
      icon: <Briefcase size={24} />,
      color: '#3b82f6',
      when: 'Faça a cada 2 horas de trabalho.',
      benefits: 'Evita a tensão no pescoço e a compressão dos discos vertebrais.',
      videos: [{ title: 'Soltura de Pescoço', url: 'VIDEO_BONUS_1' }]
    },
    {
      id: 'motoristas',
      title: 'Alongamentos para Motoristas',
      icon: <Car size={24} />,
      color: '#8b5cf6',
      when: 'Faça antes de dirigir e em paradas longas.',
      benefits: 'Reduz o encurtamento dos flexores do quadril e dor ciática.',
      videos: [{ title: 'Liberação de Quadril no Carro', url: 'VIDEO_BONUS_2' }]
    },
    {
      id: 'sentados',
      title: 'Quem Trabalha Sentado',
      icon: <Armchair size={24} />,
      color: '#0d9488',
      when: 'No final do expediente.',
      benefits: 'Descomprime a lombar baixa e alonga a cadeia posterior.',
      videos: [{ title: 'Descompressão na Cadeira', url: 'VIDEO_BONUS_3' }]
    },
    {
      id: 'matinal',
      title: 'Rotina Matinal',
      icon: <Sunrise size={24} />,
      color: '#f59e0b',
      when: 'Assim que acordar, ainda na cama ou no chão.',
      benefits: 'Acorda os músculos suavemente, eliminando a rigidez matinal.',
      videos: [{ title: 'Despertar da Coluna', url: 'VIDEO_BONUS_4' }]
    },
    {
      id: 'noturna',
      title: 'Rotina Noturna',
      icon: <Moon size={24} />,
      color: '#6366f1',
      when: '15 minutos antes de dormir.',
      benefits: 'Relaxa o sistema nervoso e prepara a coluna para o repouso.',
      videos: [{ title: 'Respiração e Soltura', url: 'VIDEO_BONUS_5' }]
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>🧰</div>
        <h1 className={styles.title}>Ferramentas Extras</h1>
        <p className={styles.subtitle}>Rotinas complementares para cada momento do seu dia.</p>
      </header>

      <div className={styles.bonusList}>
        {bonusCategories.map(cat => {
          const isOpen = selectedCategory === cat.id;
          return (
            <div key={cat.id} className={`${styles.categoryCard} ${isOpen ? styles.categoryOpen : ''}`}>
              <div
                className={styles.categoryHeader}
                onClick={() => setSelectedCategory(isOpen ? null : cat.id)}
              >
                <div className={styles.categoryIcon} style={{ background: `${cat.color}14`, color: cat.color }}>
                  {cat.icon}
                </div>
                <div className={styles.categoryInfo}>
                  <h3 className={styles.categoryTitle}>{cat.title}</h3>
                  <span className={styles.categoryHint}>{cat.when}</span>
                </div>
                <ChevronDown
                  size={20}
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                />
              </div>

              <div className={`${styles.categoryContent} ${isOpen ? styles.contentVisible : ''}`}>
                <div className={styles.benefitBox}>
                  <span className={styles.benefitLabel}>Benefícios</span>
                  <p className={styles.benefitText}>{cat.benefits}</p>
                </div>

                <div className={styles.videosContainer}>
                  {cat.videos.map((vid, idx) => (
                    <div key={idx} className={styles.videoItem}>
                      <div className={styles.playCircle} style={{ background: `${cat.color}14` }}>
                        <PlayCircle size={22} style={{ color: cat.color }} />
                      </div>
                      <div className={styles.videoInfo}>
                        <span className={styles.videoTitle}>{vid.title}</span>
                        <span className={styles.videoDuration}>Vídeo disponível</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Bonus;
