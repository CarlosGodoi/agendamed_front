# 📋 Agendamed - Sistema de Gestão de Clínicas Médicas

![Status](https://img.shields.io/badge/status-ativo-brightgreen)
![Versão](https://img.shields.io/badge/version-0.0.0-blue)
![Licença](https://img.shields.io/badge/license-MIT-green)

## 📌 O que é o Agendamed?

O **Agendamed** é uma solução completa e moderna para gestão de clínicas médicas e consultórios. O sistema foi desenvolvido para otimizar e simplificar os processos administrativos e operacionais de estabelecimentos de saúde, oferecendo uma interface intuitiva e funcionalidades robustas.

### 🎯 Problema Resolvido

Antes do Agendamed, as clínicas enfrentavam desafios como:
- ❌ Gerenciamento manual de agendamentos (planilhas, cadernos)
- ❌ Dificuldade em controlar a disponibilidade de médicos
- ❌ Falta de rastreamento do histórico de consultas
- ❌ Impossibilidade de gerar relatórios em formato digital
- ❌ Processos desorganizados para cadastro de pacientes
- ❌ Falta de controle sobre especialidades e médicos

## Demonstração

Front-end demo: agendamed-front.vercel.app
=======
### ✅ Solução Oferecida

O Agendamed resolve esses problemas fornecendo:

- **✨ Gerenciamento Completo de Agendamentos**: Agende, altere status e acompanhe todas as consultas
- **👨‍⚕️ Cadastro de Médicos e Especialidades**: Organize seus profissionais de saúde
- **👥 Gestão de Pacientes**: Registre pacientes automaticamente no primeiro agendamento
- **📊 Relatórios e Exportação**: Exporte dados em CSV para análises
- **🔐 Controle de Acesso**: Sistema de autenticação com diferentes níveis de permissão
- **📈 Visualização de Dados**: Gráficos para acompanhamento de consultas
- **🎨 Interface Moderna**: Design responsivo e intuitivo desenvolvido com Shadcn UI
- **⚡ Performance Otimizada**: Built com Vite para carregamento rápido

## 🌐 Demonstração

Acesse a aplicação em produção: [agendamed-front.vercel.app](https://agendamed-front.vercel.app)

---

## 🛠️ Stack Tecnológica

### Frontend
- **React** 18.3 - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool ultra-rápido
- **TailwindCSS** - Framework CSS utility-first
- **Shadcn UI** - Componentes reutilizáveis de alta qualidade
- **React Hook Form** - Gerenciamento eficiente de formulários
- **Zod** - Validação de schemas TypeScript
- **React Router DOM** - Roteamento da aplicação
- **Axios** - Client HTTP para requisições da API
- **Chart.js** - Visualização de dados em gráficos
- **Date-fns** - Manipulação de datas
- **PapaParse** - Parser CSV para exportação

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **Prisma** - ORM moderno para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação e autorização
- **Docker** - Containerização

---

## 📂 Estrutura do Projeto

```
agendamed_front/
├── src/
│   ├── app/                 # Páginas da aplicação
│   │   ├── home/
│   │   ├── appointments/    # Gerenciamento de consultas
│   │   ├── doctors/         # Gerenciamento de médicos
│   │   ├── patients/        # Gerenciamento de pacientes
│   │   ├── specialties/     # Gerenciamento de especialidades
│   │   ├── administration/  # Painel administrativo
│   │   └── login/           # Autenticação
│   │
│   ├── components/          # Componentes reutilizáveis
│   │   ├── modal/           # Modais de formulários
│   │   ├── tables/          # Tabelas de dados
│   │   ├── graphics/        # Componentes de gráficos
│   │   ├── ui/              # Componentes UI base (Shadcn)
│   │   ├── loading/         # Componentes de carregamento
│   │   └── ...outros
│   │
│   ├── context/             # Context API para estado global
│   │   ├── authContext.tsx
│   │   └── authProvider.tsx
│   │
│   ├── hooks/               # Custom hooks
│   │   ├── useAuthContext.ts
│   │   └── useRequest.tsx
│   │
│   ├── routes/              # Configuração de rotas
│   │   ├── index.tsx
│   │   └── private.routes.ts
│   │
│   ├── services/            # Serviços de API
│   │   ├── api.tsx
│   │   └── api_routes.ts
│   │
│   ├── utils/               # Utilitários
│   │   ├── masks/           # Máscaras de entrada
│   │   ├── interfaces/      # Tipos TypeScript
│   │   ├── mocks/           # Dados simulados
│   │   └── dictionary/      # Dicionários de valores
│   │
│   ├── enums/               # Enumerações
│   ├── guard/               # Proteção de rotas
│   ├── lib/                 # Bibliotecas customizadas
│   └── main.tsx            # Ponto de entrada
│
├── public/                  # Arquivos estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🚀 Guia de Instalação

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18+) - [Download](https://nodejs.org/)
- **pnpm** (gerenciador de pacotes) - [Instalação](https://pnpm.io/)
  ```bash
  npm install -g pnpm
  ```
- **Git** - [Download](https://git-scm.com/)
- **Backend Agendamed API** - [Repositório](https://github.com/CarlosGodoi/agendamed_api)

### Passo 1: Clonar o Repositório

Clone tanto o repositório do frontend quanto do backend:

```bash
# Frontend
git clone https://github.com/seu-usuario/agendamed_front.git
cd agendamed_front

# Backend (em outro diretório)
git clone https://github.com/CarlosGodoi/agendamed_api.git
cd agendamed_api
```

### Passo 2: Configurar e Executar o Backend

```bash
# Entrar no diretório do backend
cd agendamed_api

# Instalar dependências
npm ci

# Criar arquivo .env com as variáveis de ambiente
echo "APP_HOST=localhost
DATABASE_URL=postgresql://user:password@localhost:5432/agendamed_db
NODE_ENV=development
JWT_SECRET=sua_chave_secreta_aqui
JWT_REFRESH_SECRET=sua_chave_refresh_secreta
PORT=3000" > .env

# Criar container Docker para PostgreSQL
docker compose up -d

# Executar migrations do Prisma
npx prisma migrate dev

# Iniciar o servidor de desenvolvimento
npm run dev
```

O backend estará disponível em `http://localhost:3000`

### Passo 3: Instalar Dependências do Frontend

```bash
# Voltar para o diretório do frontend
cd ../agendamed_front

# Instalar dependências usando pnpm
pnpm install
```

### Passo 4: Configurar Variáveis de Ambiente do Frontend

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
# .env
VITE_API_BASE_URL=http://localhost:3000
```

**Observações importantes:**
- Certifique-se de que a URL está correta e o backend está rodando
- Em produção, substitua `http://localhost:3000` pela URL do seu backend

### Passo 5: Executar o Servidor de Desenvolvimento

```bash
# Iniciar o servidor de desenvolvimento com Vite
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

---

## 📝 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento com HMR |
| `pnpm build` | Compila o TypeScript e faz build da aplicação |
| `pnpm lint` | Executa o ESLint para verificar erros de código |
| `pnpm preview` | Visualiza o build de produção localmente |

---

## 🔐 Autenticação e Autorização

O Agendamed utiliza JWT (JSON Web Token) para autenticação. O sistema possui diferentes níveis de acesso:

### Níveis de Permissão

- **Administrador**: Acesso total ao sistema, incluindo gestão de usuários e configurações
- **Médico**: Acesso a suas consultas e dados de pacientes
- **Recepção**: Acesso para agendar e gerenciar consultas
- **Paciente**: Acesso limitado a suas próprias informações

### Fluxo de Autenticação

1. Usuário faz login com email e senha
2. Backend valida as credenciais e retorna JWT
3. Frontend armazena o token (em memória ou localStorage)
4. Todas as requisições subsequentes incluem o token no header `Authorization`
5. Backend valida o token em cada requisição

---

## 📊 Funcionalidades Principais

### 1. Dashboard
- Visualização de estatísticas das consultas
- Gráficos de consultas por período
- Acesso rápido às principais funções

### 2. Gerenciamento de Consultas (Appointments)
- **Listar**: Visualizar todas as consultas com filtros
- **Criar**: Agendar novas consultas
- **Alterar Status**: Mudar status para (Agendado, Confirmado, Cancelado, Realizado)
- **Exportar**: Gerar relatório em CSV
- **Filtrar**: Por data, paciente, médico, especialidade e status

### 3. Gestão de Pacientes
- **Criar**: Registrado automaticamente no primeiro agendamento
- **Editar**: Atualizar informações do paciente
- **Listar**: Visualizar todos os pacientes cadastrados
- **Exportar**: Gerar relatório em CSV
- **Buscar**: Pesquisar por nome ou CPF

### 4. Cadastro de Médicos
- **Criar**: Registrar novos médicos
- **Listar**: Visualizar médicos e suas especialidades
- **Deletar**: Remover médicos do sistema
- **Vincular Especialidades**: Associar médicos a especialidades

### 5. Gestão de Especialidades
- **Criar**: Registrar novas especialidades
- **Listar**: Visualizar todas as especialidades
- **Deletar**: Remover especialidades
- **Vincular Médicos**: Associar especialidades a médicos

### 6. Painel Administrativo
- Gerenciamento de usuários e permissões
- Configurações do sistema
- Auditoria de ações

### 7. Relatórios e Exportação
- Exportar agendamentos em CSV
- Exportar dados de pacientes em CSV
- Relatórios com formatação pronta

---

## 🎨 Componentes Principais

### Context API
- **AuthContext**: Gerencia estado de autenticação e informações do usuário
- **AuthProvider**: Fornece contexto para toda a aplicação

### Hooks Customizados
- **useAuthContext**: Acesso simplificado ao contexto de autenticação
- **useRequest**: Gerenciamento de requisições HTTP com tratamento de erros

### Componentes de Formulário
- **AdministratorFormModal**: Formulário para cadastro de administradores
- **AppointmentFormModal**: Agendamento de consultas
- **DoctorFormModal**: Cadastro de médicos
- **SpecialtyFormModal**: Cadastro de especialidades
- **EditPatientModal**: Edição de dados de pacientes
- **UpdateAppointmentStatusModal**: Alteração de status de consulta

### Componentes de UI
Componentes reutilizáveis baseados no Shadcn UI:
- Avatar, Badge, Button, Calendar, Dialog, Form, Input
- Label, Popover, Progress, Select, Table, Textarea

---

## 🧪 Desenvolvimento

### Padrões de Código

- **TypeScript**: Tipagem estrita em todo o projeto
- **React Hooks**: Apenas componentes funcionais
- **CSS-in-JS**: TailwindCSS para estilização
- **Validação**: Zod para validação de schemas
- **Requisições**: Axios com tratamento de erro centralizado

### Boas Práticas

1. **Componentes**: Sempre export default os componentes
2. **Types**: Use interfaces/types do TypeScript
3. **Nomeação**: Use camelCase para variáveis e PascalCase para componentes
4. **Pastas**: Um arquivo por componente ou funcionalidade
5. **Masks**: Use masks para CPF (999.999.999-99), telefone, etc.
6. **Validação**: Sempre valide com Zod antes de enviar

### ESLint

O projeto utiliza ESLint para manter a qualidade do código:

```bash
# Verificar erros
pnpm lint

# Verificar erros em arquivo específico
pnpm lint src/app/home/index.tsx
```

---

## 🌐 Responsividade

⚠️ **Importante**: Este sistema foi desenvolvido **exclusivamente para desktops e notebooks**. A responsividade para dispositivos móveis não foi implementada, pois o projeto é destinado para ambientes corporativos.

**Recomendação**: Acesse a aplicação em um navegador desktop com resolução mínima de 1024x768.

---

## 🔄 Fluxo de Dados

```
Frontend (React) 
    ↓
Axios (HTTP Client)
    ↓
API Backend (Express)
    ↓
Prisma ORM
    ↓
PostgreSQL (Database)
```

### Exemplo de Requisição

```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Adicionar token ao header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Listar agendamentos
const response = await api.get('/appointments');
```

---

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Erro de Conexão com a API
```
Error: Network Error - Cannot reach API
```
**Solução:**
- Verifique se o backend está rodando em `http://localhost:3000`
- Verifique a variável `VITE_API_BASE_URL` no arquivo `.env`
- Certifique-se de que o backend não tem CORS restritivo

#### 2. Erro ao Instalar Dependências
```
error ERR_PNPM_NO_MATCHING_VERSION
```
**Solução:**
```bash
pnpm install --force
```

#### 3. Porta 5173 Já em Uso
```
error Port 5173 is already in use
```
**Solução:**
```bash
# Matar o processo na porta
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>
```

#### 4. JWT Inválido ou Expirado
**Solução:**
- Limpe o localStorage: `localStorage.clear()`
- Faça login novamente
- Verifique a variável `JWT_SECRET` no backend

---

## 📚 Referências e Documentação

- [React Documentação](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2024 Agendamed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Suporte

Se você tiver dúvidas ou encontrar problemas, por favor:

1. Verifique a seção **Troubleshooting** acima
2. Consulte a documentação das dependências
3. Abra uma issue no repositório do GitHub

---

## 🙏 Agradecimentos

Agradecemos a todos os contribuidores e à comunidade open source pelas bibliotecas e ferramentas utilizadas neste projeto.

---

## 📈 Roadmap

Funcionalidades planejadas para futuras versões:

- [ ] App mobile (React Native)
- [ ] Notificações em tempo real (WebSocket)
- [ ] Integração com serviços de pagamento
- [ ] Agendamento recorrente
- [ ] Telemedicina integrada
- [ ] Dashboard com analytics avançado
- [ ] Integração com WhatsApp para lembretes
- [ ] Sistema de prescrições digitais

---

**Desenvolvido com ❤️ para modernizar a gestão de clínicas médicas**
