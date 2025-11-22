<<<<<<< HEAD

<div align="center">
  <h1>💰 DevFinance • Frontend
</h1> 
</div>

---

 **Aplicação prática com foco em controle financeiro pessoal.**  
Este projeto me permitiu aplicar conceitos modernos de desenvolvimento web com React, Firebase Authentication e consumo de APIs REST.

---

## 💻 Tecnologias Utilizadas

### → Frontend
- HTML5  
- CSS3  
- TypeScript  
- React  
- Tailwind CSS  

### ← Backend
- Node.js  
- Fastify  
- MongoDB  

---

## 🎯 Sobre o Projeto

O **DevFinance** é uma aplicação web que permite que o usuário:

- Registre receitas e despesas;
- Filtre transações por período e categorias;
- Visualize um resumo financeiro mensal;
- Faça login com conta Google via Firebase;
- Controle as finanças de forma simples e intuitiva.

---
## 🌐 Projeto em Produção
 Frontend:
<a href="https://devfinance-frontend.vercel.app/" target="_blank">DevFinance<a/>

---
## 🧪 Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/rodolfossilvadev/devfinance-frontend
cd devfinance-frontend

# 2. Instale as dependências
yarn

# 3. Configure o arquivo .env com as suas chaves do Firebase e da API
cp .env.example .env
# edite com base nas variáveis abaixo

# 4. Rode o projeto
yarn dev

VITE_API_URL=https://devfinance-backend-1.onrender.com/api
VITE_FIREBASE_API_KEY=SUA_CHAVE_AQUI
VITE_FIREBASE_AUTH_DOMAIN=devfinance-XXXXX.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=devfinance-XXXXX
VITE_FIREBASE_STORAGE_BUCKET=devfinance-XXXXX.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXXXX
VITE_FIREBASE_APP_ID=SUA_APP_ID_AQUI

=======
<<<<<<< HEAD
# devfinance-frontend
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
