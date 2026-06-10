import React, { createContext, useState, useEffect } from 'react';

export const ProgressContext = createContext();

// 15 vídeos base (3 por dia, 5 dias únicos)
const BASE_VIDEOS = [
  'VIDEO_01_URL', 'VIDEO_02_URL', 'VIDEO_03_URL',
  'VIDEO_04_URL', 'VIDEO_05_URL', 'VIDEO_06_URL',
  'VIDEO_07_URL', 'VIDEO_08_URL', 'VIDEO_09_URL',
  'VIDEO_10_URL', 'VIDEO_11_URL', 'VIDEO_12_URL',
  'VIDEO_13_URL', 'VIDEO_14_URL', 'VIDEO_15_URL',
];

// Exercícios base para os 5 dias originais
const BASE_EXERCISES = [
  // Dia 1
  [
    { title: 'Alongamento Lombar Inicial', duration: '3 min', description: 'Libera a tensão da região lombar baixa com movimentos suaves.' },
    { title: 'Mobilidade Pélvica Básica', duration: '4 min', description: 'Aumenta a circulação na pelve e reduz rigidez.' },
    { title: 'Respiração e Relaxamento', duration: '3 min', description: 'Sincroniza respiração para aliviar a tensão muscular.' },
  ],
  // Dia 2
  [
    { title: 'Soltura de Quadril', duration: '4 min', description: 'Reduz tensão acumulada nos flexores do quadril.' },
    { title: 'Mobilidade Lateral', duration: '3 min', description: 'Movimenta a coluna lateralmente para aliviar compressões.' },
    { title: 'Ativação Suave de Core', duration: '3 min', description: 'Acorda os músculos profundos que protegem a lombar.' },
  ],
  // Dia 3
  [
    { title: 'Ponte Pélvica', duration: '4 min', description: 'Fortalece os glúteos e estabiliza a base da coluna.' },
    { title: 'Rotação Torácica', duration: '3 min', description: 'Libera a região média das costas reduzindo carga lombar.' },
    { title: 'Alongamento de Cadeia Posterior', duration: '4 min', description: 'Alonga isquiotibiais e lombar para melhorar flexibilidade.' },
  ],
  // Dia 4
  [
    { title: 'Gato e Vaca', duration: '3 min', description: 'Mobilidade articular para toda a coluna vertebral.' },
    { title: 'Isometria de Core', duration: '4 min', description: 'Fortalece sem movimento para proteção segura da lombar.' },
    { title: 'Descompressão Lombar', duration: '3 min', description: 'Cria espaço entre as vértebras e alivia pressão discal.' },
  ],
  // Dia 5
  [
    { title: 'Sustentação Global', duration: '4 min', description: 'Trabalha a conexão entre abdômen, lombar e glúteos.' },
    { title: 'Rotação Controlada', duration: '3 min', description: 'Ensina o corpo a torcer com segurança e sem dor.' },
    { title: 'Relaxamento Profundo', duration: '4 min', description: 'Encerra o ciclo com relaxamento muscular completo.' },
  ],
];

// Mensagens motivacionais por fase
const PHASE_CONFIG = [
  { phase: 'Semana 1', objective: 'Mobilidade e Alívio — Vamos preparar seu corpo para se movimentar melhor.', message: 'Grandes transformações começam com pequenos movimentos.' },
  { phase: 'Semana 2', objective: 'Reforço e Consciência — Repetir com mais atenção e qualidade.', message: 'A repetição com consciência é o caminho da recuperação.' },
  { phase: 'Semana 3', objective: 'Fortalecimento — Seu corpo já responde melhor aos estímulos.', message: 'O corpo se adapta aos desafios que você oferece a ele.' },
  { phase: 'Semana 4', objective: 'Consolidação — Firmando os ganhos e criando hábito.', message: 'A consistência de hoje é a saúde de amanhã.' },
  { phase: 'Semana 5', objective: 'Domínio — Você já conhece os movimentos, agora domine-os.', message: 'Seu corpo agradece cada minuto dedicado a ele.' },
  { phase: 'Semana 6', objective: 'Proteção e Manutenção — Transforme os ganhos em um novo hábito.', message: 'O hábito foi criado. Agora ele cuida de você.' },
];

const generateDays = () => {
  const days = [];

  for (let i = 1; i <= 30; i++) {
    // Mapeia para o dia base (1-5 → 0-4)
    const baseDayIndex = ((i - 1) % 5);
    // Mapeia para a semana/fase (0-5)
    const phaseIndex = Math.floor((i - 1) / 5);
    const config = PHASE_CONFIG[phaseIndex];

    // 3 vídeos por dia, base day 0 = videos 0,1,2 / base day 1 = videos 3,4,5 / etc.
    const videoStartIndex = baseDayIndex * 3;

    const exercises = BASE_EXERCISES[baseDayIndex].map((ex, idx) => ({
      ...ex,
      id: `${i}-${idx + 1}`,
      completed: false,
      videoId: BASE_VIDEOS[videoStartIndex + idx],
    }));

    days.push({
      day: i,
      phase: config.phase,
      objective: config.objective,
      message: config.message,
      completed: false,
      unlocked: i === 1,
      exercises,
    });
  }

  return days;
};

// Version key for data migration — increment to reset stale data
const DATA_VERSION = 'v2';
const STORAGE_PREFIX = '@SuperColuna';

const initialDaysState = generateDays();

export const ProgressProvider = ({ children }) => {
  const [days, setDays] = useState(initialDaysState);
  const [checkins, setCheckins] = useState([]);
  const [badges, setBadges] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const storedVersion = localStorage.getItem(`${STORAGE_PREFIX}:version`);

      // If version mismatch, clear old data and start fresh
      if (storedVersion !== DATA_VERSION) {
        localStorage.removeItem('@SuperColuna:days');
        localStorage.removeItem('@SuperColuna:checkins');
        localStorage.removeItem('@SuperColuna:badges');
        localStorage.removeItem('@SuperColuna:tests');
        localStorage.setItem(`${STORAGE_PREFIX}:version`, DATA_VERSION);
        setLoading(false);
        return;
      }

      const storedDays = localStorage.getItem('@SuperColuna:days');
      const storedCheckins = localStorage.getItem('@SuperColuna:checkins');
      const storedBadges = localStorage.getItem('@SuperColuna:badges');
      const storedTests = localStorage.getItem('@SuperColuna:tests');

      if (storedDays) setDays(JSON.parse(storedDays));
      if (storedCheckins) setCheckins(JSON.parse(storedCheckins));
      if (storedBadges) setBadges(JSON.parse(storedBadges));
      if (storedTests) setTestResults(JSON.parse(storedTests));

      setLoading(false);
    };

    loadData();
  }, []);

  const saveDays = (newDays) => {
    setDays(newDays);
    localStorage.setItem('@SuperColuna:days', JSON.stringify(newDays));
    checkBadges(newDays);
  };

  const markExerciseCompleted = (dayIndex, exerciseId) => {
    const newDays = [...days];
    const day = newDays[dayIndex];

    const exercise = day.exercises.find(e => e.id === exerciseId);
    if (exercise) {
      exercise.completed = true;
    }

    const allExercisesCompleted = day.exercises.every(e => e.completed);
    if (allExercisesCompleted) {
      day.completed = true;
      if (dayIndex + 1 < newDays.length) {
        newDays[dayIndex + 1].unlocked = true;
      }
    }

    saveDays(newDays);
  };

  const addCheckin = (level) => {
    let feedback = '';
    switch(level) {
      case 'Muito melhor': feedback = 'Excelente. Seu corpo está respondendo ao programa.'; break;
      case 'Melhor': feedback = 'Ótimo progresso. Continue seguindo o plano.'; break;
      case 'Igual': feedback = 'Persistência é importante. O corpo precisa de repetição.'; break;
      case 'Pior': feedback = 'Observe seus movimentos e mantenha os exercícios dentro do seu conforto.'; break;
      case 'Muito pior': feedback = 'Considere reduzir a intensidade e procurar orientação profissional se necessário.'; break;
      default: feedback = 'Obrigado pelo check-in diário!';
    }

    const newCheckin = { id: Date.now(), date: new Date().toISOString(), level, feedback };
    const newCheckins = [...checkins, newCheckin];
    setCheckins(newCheckins);
    localStorage.setItem('@SuperColuna:checkins', JSON.stringify(newCheckins));
    return feedback;
  };

  const saveTestResult = (resultData) => {
    setTestResults(resultData);
    localStorage.setItem('@SuperColuna:tests', JSON.stringify(resultData));
  };

  const checkBadges = (currentDays) => {
    const completedCount = currentDays.filter(d => d.completed).length;
    const totalExercises = currentDays.reduce((acc, d) => acc + d.exercises.filter(e => e.completed).length, 0);
    const newBadges = [...badges];

    const awardBadge = (id, title, description) => {
      if (!newBadges.find(b => b.id === id)) {
        newBadges.push({ id, title, description, date: new Date().toISOString() });
      }
    };

    if (completedCount >= 1) awardBadge('b1', 'Primeiro Passo', 'Você iniciou sua jornada.');
    if (completedCount >= 3) awardBadge('b3', '3 Dias Seguidos', 'Os hábitos começam a se formar.');
    if (completedCount >= 7) awardBadge('b7', '7 Dias Seguidos', 'Uma semana completa de comprometimento.');
    if (completedCount >= 15) awardBadge('b15', '15 Dias', 'Você já percorreu metade do caminho.');
    if (completedCount >= 21) awardBadge('b21', '21 Dias', 'Seu novo hábito está ficando mais forte.');
    if (completedCount >= 30) awardBadge('b30', '30 Dias', 'Parabéns por concluir o desafio.');

    if (newBadges.length > badges.length) {
      setBadges(newBadges);
      localStorage.setItem('@SuperColuna:badges', JSON.stringify(newBadges));
    }
  };

  // Derived values
  const overallProgress = Math.round((days.filter(d => d.completed).length / 30) * 100);
  const completedDaysCount = days.filter(d => d.completed).length;
  const totalExercisesCompleted = days.reduce((acc, d) => acc + d.exercises.filter(e => e.completed).length, 0);

  // Streak calculation — consecutive completed days from day 1
  const calculateStreak = () => {
    let streak = 0;
    for (let i = 0; i < days.length; i++) {
      if (days[i].completed) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  return (
    <ProgressContext.Provider value={{
      days, checkins, badges, loading, testResults,
      markExerciseCompleted, addCheckin, saveTestResult, overallProgress,
      completedDaysCount, totalExercisesCompleted, currentStreak
    }}>
      {children}
    </ProgressContext.Provider>
  );
};
