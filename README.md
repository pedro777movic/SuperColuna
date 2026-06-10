# Super Coluna — Desafio 30 Dias

Aplicativo web premium de recuperação e fortalecimento lombar.

## Tecnologias

- **React + Vite** — Framework e bundler
- **CSS Modules** — Estilização com escopo por componente
- **React Router DOM** — Roteamento SPA
- **Lucide React** — Ícones modernos
- **Context API** — Estado global (progresso, autenticação)
- **localStorage** — Persistência de dados local

## Rodando Localmente

```bash
npm install
npm run dev
```

## Build de Produção

```bash
npm run build
```

## Deploy

O projeto está configurado para deploy automático na **Netlify**:

- Build command: `npm run build`
- Publish directory: `dist`
- Redirects: configurados via `netlify.toml` para suporte ao React Router

## Estrutura

```
src/
  components/    # Componentes reutilizáveis
  contexts/      # AuthContext + ProgressContext
  pages/
    Auth/        # Login e Cadastro
    Home/        # Dashboard principal
    Program/     # Programa 30 Dias
    Tests/       # Teste Inicial e Evolução
    Gamification/# Conquistas e medalhas
    Bonus/       # Área de bônus
    Profile/     # Perfil e certificado
    Celebration/ # Tela de conclusão dos 30 dias
```

## Funcionalidades

- ✅ Programa de 30 dias dividido em 3 fases
- ✅ Gamificação com 6 medalhas de conquista
- ✅ Check-in diário com feedback personalizado
- ✅ Teste inicial e relatório de evolução
- ✅ Área de bônus com 5 rotinas específicas
- ✅ Certificado digital ao concluir os 30 dias
- ✅ 50 mensagens motivacionais rotativas
- ✅ Design premium mobile-first
- ✅ Persistência de dados via localStorage
