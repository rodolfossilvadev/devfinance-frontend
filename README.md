
<div align="center">
  <a href="https://devfinance-frontend.vercel.app/" target="_blank">💰 DevFinance • Frontend
</a> 
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
🔗 https://devfinance-frontend.vercel.app

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

