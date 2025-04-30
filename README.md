# 🧾 Sistema de Gerenciamento de Advogados

Sistema completo e profissional desenvolvido com Node.js, TypeScript, Prisma, MySQL, React, Tailwind CSS e Zod. Permite a gestão de clientes, fichas jurídicas, usuários e compromissos com autenticação segura via JWT. Ideal para escritórios de advocacia organizarem seus atendimentos, histórico e compromissos com controle de acesso por perfil.

---

## 🚀 Funcionalidades

### 🔐 Autenticação e Perfis

- Cadastro e login de usuários
- Controle de acesso por `role` (`MASTER` ou `ADVOGADO`)
- Autenticação via JWT com rotas protegidas

### 👥 Gestão de Usuários

- MASTER pode cadastrar novos advogados
- Atualização de dados e senha
- Alteração de permissões (role)

### 📂 Gestão de Clientes e Fichas

- CRUD completo de clientes
- Cadastro de fichas jurídicas por cliente
- Histórico de fichas com andamentos associados
- Exportação de ficha em PDF

### 🗓️ Compromissos

- Cadastro e listagem de compromissos por usuário
- Agenda individual

### 📊 Dashboard

- Total de clientes
- Total de fichas
- Fichas por mês

---

## 🛠️ Tecnologias Utilizadas

### Backend

- Node.js + Express
- TypeScript
- Prisma ORM
- MySQL
- JWT
- pdfkit
- Zod para validação

### Frontend

- React + TypeScript
- Tailwind CSS
- React Hook Form + Zod
- React Input Mask
- Axios
- PrivateRoute para rotas protegidas

---

## 📁 Estrutura do Projeto

```bash
SistemaAdvogados/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── types/
│   │   └── server.ts
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
└── README.md
```

---

## 🔐 Roles disponíveis

| Role       | Acesso                                                                      |
| ---------- | --------------------------------------------------------------------------- |
| `MASTER`   | Pode cadastrar usuários, ver todos os clientes, fichas e alterar permissões |
| `ADVOGADO` | Visualiza apenas seus próprios clientes e fichas                            |

---

## ▶️ Como rodar o projeto

### 📦 Backend

1. Clonar o repositório:

```bash
git clone https://github.com/Geeh17/SistemaAdvogados.git
cd SistemaAdvogados/backend
```

2. Instalar dependências:

```bash
npm install
```

3. Configurar o `.env`:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/sistemadb"
JWT_SECRET="segredo"
```

4. Criar o banco:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Iniciar:

```bash
npm run dev
```

---

### 🌐 Frontend

1. Acesse a pasta:

```bash
cd SistemaAdvogados/frontend
```

2. Instalar dependências:

```bash
npm install
```

3. Iniciar aplicação:

```bash
npm run dev
```

> 🔗 A aplicação estará disponível em: `http://localhost:5173`

---

## 📥 Endpoints principais (API)

| Método | Rota                   | Descrição                             |
| ------ | ---------------------- | ------------------------------------- |
| POST   | `/usuarios`            | Cria um novo usuário                  |
| GET    | `/usuarios`            | Lista todos os usuários (MASTER)      |
| GET    | `/usuarios/perfil`     | Busca dados do usuário autenticado    |
| PUT    | `/usuarios/perfil`     | Atualiza dados pessoais ou senha      |
| POST   | `/clientes`            | Cadastra um novo cliente              |
| GET    | `/clientes`            | Lista os clientes do advogado logado  |
| POST   | `/fichas/:clienteId`   | Cria ficha para cliente               |
| GET    | `/fichas/:clienteId`   | Lista fichas de um cliente específico |
| GET    | `/fichas/:id/pdf`      | Gera PDF de uma ficha                 |
| GET    | `/dashboard`           | Exibe total de clientes e fichas      |
| POST   | `/andamentos`          | Cria novo andamento                   |
| GET    | `/andamentos/:fichaId` | Lista andamentos da ficha             |
| POST   | `/compromissos`        | Cria compromisso para usuário         |
| GET    | `/compromissos`        | Lista compromissos do usuário         |

---

## 📌 Observações

- Todos os endpoints (exceto login) exigem autenticação via **Bearer Token**
- O front consome exclusivamente a API local
- Senhas são armazenadas com **bcrypt**

---

## 🧑‍⚖️ Ideal para:

- Escritórios de advocacia com 1 ou mais profissionais
- Controle centralizado por um usuário MASTER
- Armazenamento seguro de histórico de atendimentos
- Gerenciamento de tarefas e compromissos jurídicos

---

## 🧠 Autor

Desenvolvido por **Geraldo Luiz** – Analista de Sistemas e Desenvolvedor Full Stack.  
Portfólio: [https://portfolio-geeh.netlify.app](https://portfolio-geeh.netlify.app)
