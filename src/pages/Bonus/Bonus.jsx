import React, { useState } from 'react';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import { PlayCircle, Briefcase, Car, Armchair, Sunrise, Moon } from 'lucide-react';
import styles from './Bonus.module.css';

const Bonus = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const bonusCategories = [
    {
      id: 'escritorio',
      title: 'Alongamentos para Escritório',
      icon: <Briefcase size={24} />,
      when: 'Faça a cada 2 horas de trabalho.',
      benefits: 'Evita a tensão no pescoço e a compressão dos discos vertebrais.',
      videos: [{ title: 'Soltura de Pescoço', url: 'VIDEO_BONUS_1' }]
    },
    {
      id: 'motoristas',
      title: 'Alongamentos para Motoristas',
      icon: <Car size={24} />,
      when: 'Faça antes de dirigir e em paradas longas.',
      benefits: 'Reduz o encurtamento dos flexores do quadril e dor ciática.',
      videos: [{ title: 'Liberação de Quadril no Carro', url: 'VIDEO_BONUS_2' }]
    },
    {
      id: 'sentados',
      title: 'Quem Trabalha Sentado',
      icon: <Armchair size={24} />,
      when: 'No final do expediente.',
      benefits: 'Descomprime a lombar baixa e alonga a cadeia posterior.',
      videos: [{ title: 'Descompressão na Cadeira', url: 'VIDEO_BONUS_3' }]
    },
    {
      id: 'matinal',
      title: 'Rotina Matinal',
      icon: <Sunrise size={24} />,
      when: 'Assim que acordar, ainda na cama ou no chão.',
      benefits: 'Acorda os músculos suavemente, eliminando a rigidez matinal.',
      videos: [{ title: 'Despertar da Coluna', url: 'VIDEO_BONUS_4' }]
    },
    {
      id: 'noturna',
      title: 'Rotina Noturna',
      icon: <Moon size={24} />,
      when: '15 minutos antes de dormir.',
      benefits: 'Relaxa o sistema nervoso e prepara a coluna para o repouso.',
      videos: [{ title: 'Respiração e Soltura', url: 'VIDEO_BONUS_5' }]
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Área de Bônus</h1>
        <p className={styles.subtitle}>Rotinas extras para situações específicas.</p>
      </header>

      <div className={styles.bonusList}>
        {bonusCategories.map(cat => (
          <div key={cat.id} className={styles.categoryCard}>
            <div 
              className={styles.categoryHeader}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            >
              <div className={styles.categoryIcon}>{cat.icon}</div>
              <h3 className={styles.categoryTitle}>{cat.title}</h3>
            </div>

            {selectedCategory === cat.id && (
              <div className={styles.categoryContent}>
                <p><strong>Quando fazer:</strong> {cat.when}</p>
                <p><strong>Benefícios:</strong> {cat.benefits}</p>
                
                <div className={styles.videosContainer}>
                  {cat.videos.map((vid, idx) => (
                    <div key={idx} className={styles.videoItem}>
                      <PlayCircle size={20} className={styles.playIcon} />
                      <span>{vid.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Bonus;
