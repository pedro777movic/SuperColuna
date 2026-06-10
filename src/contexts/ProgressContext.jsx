import React, { createContext, useState, useEffect } from 'react';

export const ProgressContext = createContext();

// Função para gerar os 30 dias de forma progressiva
const generateDays = () => {
  const days = [];
  const videos = [
    'VIDEO_01_URL', 'VIDEO_02_URL', 'VIDEO_03_URL', 'VIDEO_04_URL', 'VIDEO_05_URL',
    'VIDEO_06_URL', 'VIDEO_07_URL', 'VIDEO_08_URL', 'VIDEO_09_URL', 'VIDEO_10_URL'
  ];

  for (let i = 1; i <= 30; i++) {
    let phase = '';
    let objective = '';
    let message = '';
    let exercises = [];

    if (i <= 10) {
      phase = 'Fase 1';
      objective = 'Mobilidade e Alívio - Vamos preparar seu corpo para se movimentar melhor.';
      message = 'Grandes transformações começam com pequenos movimentos.';
      exercises = [
        { id: `${i}-1`, title: 'Alongamento Lombar Inicial', duration: '3 min', description: 'Libera a tensão da região lombar baixa com movimentos suaves.', completed: false, videoId: videos[(i % 10)] },
        { id: `${i}-2`, title: 'Mobilidade Pélvica Básica', duration: '4 min', description: 'Aumenta a circulação na pelve e reduz rigidez.', completed: false, videoId: videos[((i + 1) % 10)] },
        { id: `${i}-3`, title: 'Respiração e Relaxamento', duration: '3 min', description: 'Sincroniza respiração para aliviar a tensão muscular.', completed: false, videoId: videos[((i + 2) % 10)] }
      ];
    } else if (i <= 20) {
      phase = 'Fase 2';
      objective = 'Fortalecimento e Estabilidade - Agora vamos fortalecer a musculatura que protege sua lombar.';
      message = 'O corpo se adapta aos desafios que você oferece a ele.';
      exercises = [
        { id: `${i}-1`, title: 'Ativação de Core (Isometria)', duration: '4 min', description: 'Acorda os músculos profundos do abdômen para proteger a coluna.', completed: false, videoId: videos[(i % 10)] },
        { id: `${i}-2`, title: 'Ponte Pélvica', duration: '3 min', description: 'Fortalece os glúteos e estabiliza a base da coluna.', completed: false, videoId: videos[((i + 1) % 10)] },
        { id: `${i}-3`, title: 'Mobilidade Torácica', duration: '3 min', description: 'Reduz a carga sobre a lombar liberando o meio das costas.', completed: false, videoId: videos[((i + 2) % 10)] }
      ];
    } else {
      phase = 'Fase 3';
      objective = 'Proteção e Manutenção - Transforme os ganhos em um novo hábito.';
      message = 'A consistência de hoje é a saúde de amanhã.';
      exercises = [
        { id: `${i}-1`, title: 'Sustentação Global', duration: '4 min', description: 'Trabalha a conexão entre abdômen, lombar e glúteos.', completed: false, videoId: videos[(i % 10)] },
        { id: `${i}-2`, title: 'Rotação Controlada', duration: '3 min', description: 'Ensina o corpo a torcer com segurança e sem dor.', completed: false, videoId: videos[((i + 1) % 10)] },
        { id: `${i}-3`, title: 'Cadeia Posterior', duration: '3 min', description: 'Foca nos músculos posteriores da coxa e lombar baixa.', completed: false, videoId: videos[((i + 2) % 10)] }
      ];
    }

    days.push({
      day: i,
      phase,
      objective,
      message,
      completed: false,
      unlocked: i === 1,
      exercises
    });
  }
  return days;
};

const initialDaysState = generateDays();

export const ProgressProvider = ({ children }) => {
  const [days, setDays] = useState(initialDaysState);
  const [checkins, setCheckins] = useState([]);
  const [badges, setBadges] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
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
    if (totalExercises >= 100) awardBadge('e100', '100 Exercícios', 'Consistência gera transformação.'); // Nota: Total de exer é 90, mas deixo a lógica pronta caso tenha bônus.

    if (newBadges.length > badges.length) {
      setBadges(newBadges);
      localStorage.setItem('@SuperColuna:badges', JSON.stringify(newBadges));
    }
  };

  const overallProgress = Math.round((days.filter(d => d.completed).length / 30) * 100);

  return (
    <ProgressContext.Provider value={{
      days, checkins, badges, loading, testResults,
      markExerciseCompleted, addCheckin, saveTestResult, overallProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};
