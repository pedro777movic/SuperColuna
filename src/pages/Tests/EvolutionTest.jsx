import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../contexts/ProgressContext';
import { Calendar, CheckCircle2, TrendingUp, Flame } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Tests.module.css';

const EvolutionTest = () => {
  const navigate = useNavigate();
  const { testResults, checkins, days, completedDaysCount, totalExercisesCompleted, currentStreak } = useContext(ProgressContext);

  if (!testResults) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.emptyState}>
          <div className={styles.emptyEmoji}>📋</div>
          <h2>Nenhum teste inicial encontrado.</h2>
          <p className={styles.emptyText}>Faça sua avaliação para acompanhar a evolução.</p>
          <button className={styles.primaryButton} onClick={() => navigate('/initial-test')}>
            Fazer Teste Inicial
          </button>
        </div>
      </div>
    );
  }

  // Chart data from check-ins
  const levelMap = {
    'Muito pior': 1,
    'Pior': 2,
    'Igual': 3,
    'Melhor': 4,
    'Muito melhor': 5,
  };

  const chartData = checkins.map((c, idx) => ({
    name: `#${idx + 1}`,
    valor: levelMap[c.level] || 3,
  }));

  // Perceived evolution: % of positive check-ins
  const positiveCheckins = checkins.filter(c => c.level === 'Melhor' || c.level === 'Muito melhor').length;
  const perceivedPercent = checkins.length > 0 ? Math.round((positiveCheckins / checkins.length) * 100) : 0;

  // Circular progress
  const progressPercent = Math.round((completedDaysCount / 30) * 100);
  const circumference = 2 * Math.PI * 42;
  const dashOffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Relatório de Evolução</h1>
        <p className={styles.subtitle}>Acompanhe o que mudou desde o seu primeiro dia.</p>
      </header>

      {/* Summary Grid */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryBox}>
          <Calendar size={22} className={styles.iconPrimary} />
          <span className={styles.summaryValue}>{completedDaysCount}</span>
          <span className={styles.summaryLabel}>Dias Concluídos</span>
        </div>
        <div className={styles.summaryBox}>
          <CheckCircle2 size={22} className={styles.iconSuccess} />
          <span className={styles.summaryValue}>{checkins.length}</span>
          <span className={styles.summaryLabel}>Check-ins</span>
        </div>
        <div className={styles.summaryBox}>
          <TrendingUp size={22} className={styles.iconTeal} />
          <span className={styles.summaryValue}>{totalExercisesCompleted}</span>
          <span className={styles.summaryLabel}>Exercícios</span>
        </div>
        <div className={styles.summaryBox}>
          <Flame size={22} className={styles.iconGold} />
          <span className={styles.summaryValue}>{currentStreak}</span>
          <span className={styles.summaryLabel}>Sequência</span>
        </div>
      </div>

      {/* Circular Progress */}
      <div className={styles.circularCard}>
        <div className={styles.circularContainer}>
          <svg className={styles.circularSvg} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#e8ecf0" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-teal)" />
                <stop offset="100%" stopColor="var(--color-primary)" />
              </linearGradient>
            </defs>
          </svg>
          <div className={styles.circularText}>
            <span className={styles.circularPercent}>{progressPercent}%</span>
            <span className={styles.circularLabel}>concluído</span>
          </div>
        </div>
        <span className={styles.circularCaption}>{completedDaysCount} de 30 dias completados</span>
      </div>

      {/* Evolução Percebida */}
      <div className={styles.perceivedCard}>
        <h3 className={styles.perceivedTitle}>Evolução Percebida</h3>
        <div className={styles.perceivedBarTrack}>
          <div
            className={styles.perceivedBarFill}
            style={{ width: `${perceivedPercent}%` }}
          />
        </div>
        <div className={styles.perceivedRow}>
          <span className={styles.perceivedValue}>{perceivedPercent}%</span>
          <span className={styles.perceivedLabel}>dos check-ins indicam melhora</span>
        </div>
      </div>

      {/* Check-in Chart */}
      {chartData.length > 0 && (
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Histórico de Check-ins</h3>
          <p className={styles.chartSubtitle}>Como você se sentiu ao longo do programa</p>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  tickFormatter={(v) => ['', 'M.Pior', 'Pior', 'Igual', 'Melhor', 'M.Melhor'][v]}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '10px', fontSize: '12px', border: '1px solid #e5e7eb' }}
                  formatter={(v) => [['', 'Muito pior', 'Pior', 'Igual', 'Melhor', 'Muito melhor'][v], 'Sensação']}
                />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="var(--color-teal)"
                  strokeWidth={2.5}
                  dot={{ fill: 'var(--color-teal)', r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: 'var(--color-primary)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Comparison */}
      <div className={styles.comparisonCard}>
        <h3 className={styles.comparisonTitle}>Situação Inicial vs Atual</h3>
        <p className={styles.comparisonSubtitle}>Média de dor lombar reportada</p>
        <div className={styles.barChart}>
          <div className={styles.barRow}>
            <span>Teste Inicial: {testResults.answers.dorLombar}/10</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: `${testResults.answers.dorLombar * 10}%`, backgroundColor: '#ef4444' }}></div>
            </div>
          </div>
          <div className={styles.barRow}>
            <span>Sensação Atual (Último Check-in):</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: '30%', backgroundColor: 'var(--color-success)' }}></div>
            </div>
          </div>
        </div>
        <p className={styles.motivationalText}>
          "O movimento consistente está reduzindo sua percepção de dor. Continue seguindo o programa!"
        </p>
      </div>

      <button className={styles.primaryButton} onClick={() => navigate('/')}>
        Voltar para Home
      </button>
    </div>
  );
};

export default EvolutionTest;
