# Agendamed

Este projeto foi criado para com intuito de gerar uma solução para gestão de clinicas médicas, podendo ser feito a gestão das consultas agendadas, alterações nos status das consultas, cadastramento de novas consultas, listagem de médicos, especialidades e consultas. O sistema também possibilita a exportação de dados dos agendamentos e de pacientes em formato .CSV. Dentre as soluções propostas estão o cadastro de especialidades, médicos, para pacientes o cadastro é realizado no momento em que é feito o primeiro agendamento de consulta, conforme previsto na regra de negocio.

Este sistema foi desenvolvido para utilização em desktops, notebooks. A responsividade para dispositivos moveis não foi adotada, devido ao entendimento que este sistema deve ser utilizados em ambientes corporativos, portanto ao testar, teste-o em um desktop ou notebook para melhor experiência.

## Tecnologias utilizadas

## Stack utilizada

**Front-end:** React, Vite, TailwindCSS e Shadcn UI

**Back-end:** Node, Prisma, Express, JWT

## Clone do projeto Agendamed_API

```bash
  git clone https://github.com/CarlosGodoi/agendamed_api.git
```

## Variáveis de Ambiente Backend

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`APP_HOST`
`DATABASE_URL`
`NODE_ENV`
`JWT_SECRET`
`JWT_REFRESH_SECRET`
`PORT`

## Criando container Docker

Para criação do container no docker para o banco de dados Postgres, rode o seguinte comando

```bash
  docker compose up
```

## Criando migrations

Após a criação do container execute as migrations, rode o seguinte comando

```bash
  npx prisma migrate dev
```

## Para Executar o programa pela primeira vez a API

Instale as depêndencias do projeto, rode o seguinte comando

```bash
  npm ci
```

Iniciando o projeto, rode o seguinte comando

```bash
  npm run dev
```

## Variáveis de Ambiente Front-End

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`VITE_API_BASE_URL`

## Demonstração

agendamed-front.vercel.app

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
	languageOptions: {
		// other options...
		parserOptions: {
			project: ['./tsconfig.node.json', './tsconfig.app.json'],
			tsconfigRootDir: import.meta.dirname,
		},
	},
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
	// Set the react version
	settings: { react: { version: '18.3' } },
	plugins: {
		// Add the react plugin
		react,
	},
	rules: {
		// other rules...
		// Enable its recommended rules
		...react.configs.recommended.rules,
		...react.configs['jsx-runtime'].rules,
	},
});
```
