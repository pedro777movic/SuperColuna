import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../contexts/ProgressContext';
import { AuthContext } from '../../contexts/AuthContext';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import { Play, Flame, Calendar, Dumbbell, TrendingUp, Briefcase, Car, Armchair, Sunrise, Moon, ChevronRight } from 'lucide-react';
import styles from './Home.module.css';

const Home = () => {
  const { days, overallProgress, completedDaysCount, totalExercisesCompleted, currentStreak } = useContext(ProgressContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Encontra o próximo dia desbloqueado e não concluído
  const currentDayIndex = days.findIndex(d => !d.completed && d.unlocked);
  const currentDay = currentDayIndex !== -1 ? days[currentDayIndex] : null;
  const daysRemaining = 30 - completedDaysCount;

  // 50 Motivational Messages Array
  const motivationalMessages = [
    "Seu futuro agradece pelos cuidados de hoje.",
    "Movimento é um investimento na sua qualidade de vida.",
    "Pequenos passos geram grandes mudanças.",
    "Continue avançando.",
    "Cada dia é uma nova chance de fortalecer seu corpo.",
    "A consistência supera a intensidade.",
    "Respeite seus limites, mas desafie sua rigidez.",
    "O movimento lubrifica as engrenagens do seu corpo.",
    "Sua coluna merece esse cuidado diário.",
    "Respire, alongue, fortaleça. Você está no caminho certo.",
    "A dor diminui onde o movimento saudável entra.",
    "Saúde não se compra, se cultiva diariamente.",
    "Um pouco de esforço hoje é o conforto de amanhã.",
    "Sua recuperação começa com o primeiro movimento.",
    "Acredite no processo e sinta as pequenas vitórias.",
    "A mobilidade é a chave para a liberdade do seu corpo.",
    "Postura forte, vida longa.",
    "Transforme o alívio em um novo hábito de vida.",
    "A rigidez matinal é um convite para o movimento.",
    "Você é mais forte do que a sua dor.",
    "Dê ao seu corpo o movimento que ele precisa.",
    "O corpo humano foi feito para se mover com graça.",
    "Não subestime o poder de 10 minutos de dedicação.",
    "Suas escolhas de hoje definem seu bem-estar amanhã.",
    "Mantenha a rotina. Seu corpo vai te recompensar.",
    "Sinta cada músculo trabalhando a seu favor.",
    "O conforto a longo prazo exige esforço de curto prazo.",
    "Sua evolução é diária, sinta o progresso.",
    "Foque na técnica, o alívio virá naturalmente.",
    "Movimente-se com intenção e propósito.",
    "O sedentarismo trava, o movimento liberta.",
    "Cada alongamento é um passo rumo ao alívio.",
    "Cuide do seu eixo de sustentação.",
    "Seu corpo é seu maior patrimônio.",
    "Um movimento leve vale mais que o repouso absoluto.",
    "A jornada de recuperação é uma maratona, não uma corrida.",
    "Conecte sua mente com a melhora do seu corpo.",
    "Mais mobilidade significa menos limitações.",
    "Fortalecer a base é o segredo de uma coluna saudável.",
    "Cada exercício concluído é um remédio natural.",
    "Sinta gratidão pelo que seu corpo consegue fazer hoje.",
    "O caminho sem dor é construído dia a dia.",
    "A saúde da sua coluna impacta todas as suas atividades.",
    "Crie o hábito e o hábito cuidará de você.",
    "Transforme o desconforto em motivação para mudar.",
    "Permita que seu corpo redescubra o movimento livre.",
    "Aliviar a tensão é dar férias para a sua coluna.",
    "Você está investindo no seu conforto vitalício.",
    "A persistência é a chave da fisioterapia preventiva.",
    "Sua coluna agradece cada minuto dedicado a ela."
  ];

  // Pick one randomly or based on day
  const dailyMessage = motivationalMessages[(new Date().getDate() + (currentDay?.day || 0)) % motivationalMessages.length];

  // Vídeos educativos
  const educationalVideos = [
    { id: 1, title: 'Por que sentimos dor lombar?', url: 'VIDEO_EDUCATIVO_1_URL', emoji: '🔍' },
    { id: 2, title: 'Hábitos que prejudicam sua coluna', url: 'VIDEO_EDUCATIVO_2_URL', emoji: '⚠️' },
    { id: 3, title: 'Como proteger sua lombar no dia a dia', url: 'VIDEO_EDUCATIVO_3_URL', emoji: '🛡️' },
  ];

  // Ferramentas Extras
  const extraTools = [
    { icon: <Briefcase size={20} />, label: 'Escritório' },
    { icon: <Car size={20} />, label: 'Motoristas' },
    { icon: <Armchair size={20} />, label: 'Sentados' },
    { icon: <Sunrise size={20} />, label: 'Matinal' },
    { icon: <Moon size={20} />, label: 'Noturna' },
  ];

  // Spine SVG icon inline
  const SpineIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.spineIcon}>
      <ellipse cx="12" cy="3" rx="5" ry="2.5" fill="currentColor" opacity="0.7"/>
      <rect x="10.5" y="5" width="3" height="2.5" rx="1" fill="currentColor" opacity="0.5"/>
      <ellipse cx="12" cy="9.5" rx="5.5" ry="2.5" fill="currentColor" opacity="0.7"/>
      <rect x="10.5" y="11.5" width="3" height="2.5" rx="1" fill="currentColor" opacity="0.5"/>
      <ellipse cx="12" cy="16" rx="5" ry="2.5" fill="currentColor" opacity="0.7"/>
      <rect x="10.5" y="18" width="3" height="2" rx="1" fill="currentColor" opacity="0.5"/>
      <ellipse cx="12" cy="22" rx="4" ry="2" fill="currentColor" opacity="0.7"/>
    </svg>
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.greetingRow}>
            <SpineIcon />
            <h1 className={styles.greeting}>Olá, {user?.name?.split(' ')[0]} 👋</h1>
          </div>
          <p className={styles.subtitle}>{dailyMessage}</p>
        </div>
        <img src={user?.avatar} alt="Avatar" className={styles.avatar} />
      </header>

      {/* Mini Stats */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <Calendar size={18} className={styles.statIconPrimary} />
          <span className={styles.statValue}>{currentDay ? currentDay.day : 30}</span>
          <span className={styles.statLabel}>Dia Atual</span>
        </div>
        <div className={styles.statCard}>
          <TrendingUp size={18} className={styles.statIconTeal} />
          <span className={styles.statValue}>{daysRemaining}</span>
          <span className={styles.statLabel}>Dias Restantes</span>
        </div>
        <div className={styles.statCard}>
          <Dumbbell size={18} className={styles.statIconSuccess} />
          <span className={styles.statValue}>{totalExercisesCompleted}</span>
          <span className={styles.statLabel}>Exercícios</span>
        </div>
        <div className={styles.statCard}>
          <Flame size={18} className={styles.statIconGold} />
          <span className={styles.statValue}>{currentStreak}</span>
          <span className={styles.statLabel}>Sequência</span>
        </div>
      </section>

      {/* Progress Bar */}
      <section className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressTitle}>Progresso Geral</span>
          <span className={styles.progressValue}>{overallProgress}%</span>
        </div>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </section>

      {/* Main Action Card */}
      <section className={styles.nextActionSection}>
        {currentDay ? (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.dayBadge}>Dia {currentDay.day}</span>
              <span className={styles.statusText}>Aguardando você</span>
            </div>
            <h2 className={styles.cardTitle}>Sua próxima sessão está pronta</h2>
            <p className={styles.cardDesc}>3 exercícios rápidos para a lombar.</p>
            <button
              className={styles.primaryButton}
              onClick={() => navigate('/program')}
            >
              CONTINUAR PROGRAMA
            </button>
          </div>
        ) : (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Parabéns! 🎉</h2>
            <p className={styles.cardDesc}>Você completou todos os dias do programa.</p>
            <button
              className={styles.primaryButton}
              onClick={() => navigate('/profile')}
            >
              VER MEU CERTIFICADO
            </button>
          </div>
        )}
      </section>

      {/* Entenda Sua Coluna */}
      <section className={styles.educSection}>
        <h3 className={styles.sectionTitle}>
          <SpineIcon />
          Entenda Sua Coluna
        </h3>
        <div className={styles.educGrid}>
          {educationalVideos.map(video => (
            <div key={video.id} className={styles.educCard}>
              <div className={styles.educThumb}>
                <span className={styles.educEmoji}>{video.emoji}</span>
                <div className={styles.educPlayBtn}>
                  <Play size={16} fill="white" color="white" />
                </div>
              </div>
              <span className={styles.educTitle}>{video.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Ferramentas Extras */}
      <section className={styles.toolsSection}>
        <div className={styles.toolsHeader} onClick={() => navigate('/bonus')}>
          <h3 className={styles.sectionTitle}>🧰 Ferramentas Extras</h3>
          <ChevronRight size={20} className={styles.chevron} />
        </div>
        <div className={styles.toolsRow}>
          {extraTools.map((tool, idx) => (
            <div key={idx} className={styles.toolChip} onClick={() => navigate('/bonus')}>
              <div className={styles.toolIcon}>{tool.icon}</div>
              <span className={styles.toolLabel}>{tool.label}</span>
            </div>
          ))}
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
};

export default Home;
