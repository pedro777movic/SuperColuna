import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CalendarDays, Award, User, Activity } from 'lucide-react';
import styles from './BottomNavigation.module.css';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={24} /> },
    { path: '/program', label: 'Programa', icon: <CalendarDays size={24} /> },
    { path: '/evolution-test', label: 'Evolução', icon: <Activity size={24} /> },
    { path: '/gamification', label: 'Conquistas', icon: <Award size={24} /> },
    { path: '/profile', label: 'Perfil', icon: <User size={24} /> },
  ];

  return (
    <nav className={styles.navContainer}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <div 
            key={item.path} 
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className={styles.label}>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
