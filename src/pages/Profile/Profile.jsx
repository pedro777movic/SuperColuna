import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ProgressContext } from '../../contexts/ProgressContext';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import { LogOut, Download, Award, Target, Calendar } from 'lucide-react';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const { overallProgress, days, badges } = useContext(ProgressContext);

  const completedDays = days.filter(d => d.completed).length;

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Meu Perfil</h1>
      </header>

      <div className={styles.profileCard}>
        <img src={user?.avatar} alt="Avatar" className={styles.avatar} />
        <h2 className={styles.name}>{user?.name}</h2>
        <span className={styles.email}>{user?.email}</span>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statBox}>
          <Target size={24} className={styles.statIcon} />
          <span className={styles.statValue}>{overallProgress}%</span>
          <span className={styles.statLabel}>Progresso</span>
        </div>
        <div className={styles.statBox}>
          <Calendar size={24} className={styles.statIcon} />
          <span className={styles.statValue}>{completedDays}/30</span>
          <span className={styles.statLabel}>Dias Concluídos</span>
        </div>
        <div className={styles.statBox}>
          <Award size={24} className={styles.statIcon} />
          <span className={styles.statValue}>{badges.length}</span>
          <span className={styles.statLabel}>Conquistas</span>
        </div>
      </div>

      {overallProgress === 100 && (
        <div className={styles.certificateCard}>
          <h3 className={styles.certTitle}>Seu Certificado</h3>
          <p className={styles.certText}>
            "Certificamos que <strong>{user?.name}</strong> concluiu com sucesso o Desafio 30 Dias Super Coluna, demonstrando comprometimento com sua mobilidade, fortalecimento e qualidade de vida."
          </p>
        </div>
      )}

      <div className={styles.actionsList}>
        <button className={styles.actionButton} onClick={logout} style={{ color: '#ef4444' }}>
          <LogOut size={20} />
          Sair do Aplicativo
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
