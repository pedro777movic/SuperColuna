import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../contexts/ProgressContext';
import { AuthContext } from '../../contexts/AuthContext';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import styles from './Home.module.css';

const Home = () => {
  const { days, overallProgress } = useContext(ProgressContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Encontra o próximo dia desbloqueado e não concluído
  const currentDayIndex = days.findIndex(d => !d.completed && d.unlocked);
  const currentDay = currentDayIndex !== -1 ? days[currentDayIndex] : null;

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

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>Olá, {user?.name?.split(' ')[0]} 👋</h1>
          <p className={styles.subtitle}>{dailyMessage}</p>
        </div>
        <img src={user?.avatar} alt="Avatar" className={styles.avatar} />
      </header>

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

      <BottomNavigation />
    </div>
  );
};

export default Home;
