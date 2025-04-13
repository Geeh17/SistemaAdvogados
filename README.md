# 🧾 Sistema de Gerenciamento de Advogados

Sistema completo e profissional desenvolvido com Node.js, TypeScript, Prisma e MySQL. Permite a gestão de clientes, fichas jurídicas, autenticação segura com JWT e exportação de atendimentos em PDF. Ideal para escritórios de advocacia organizarem seus atendimentos com controle de histórico e acesso por perfil de usuário.

## 🚀 Funcionalidades

- ✅ Cadastro e autenticação de usuários (ADVOGADO e MASTER)
- ✅ Controle de acesso por permissão (`role`)
- ✅ Cadastro de clientes
- ✅ Criação e histórico de fichas jurídicas por cliente
- ✅ Geração de PDF das fichas
- ✅ Dashboard com total de clientes, fichas e fichas por mês
- ✅ Proteção de rotas com JWT

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM**
- **MySQL**
- **JWT** para autenticação
- **pdfkit** para exportação em PDF

## 📁 Estrutura do Projeto

backend/
├── prisma/
│   └── schema.prisma          # Modelos do banco de dados
├── src/
│   ├── controllers/           # Lógica dos endpoints
│   ├── middleware/            # Autenticação e autorização
│   ├── routes/                # Rotas da aplicação
│   ├── types/express/         # Tipagens personalizadas (req.usuario, etc.)
│   └── server.ts              # Ponto de entrada da API

## 🔐 Roles disponíveis

| Role     | Acesso                                                   |
|----------|----------------------------------------------------------|
| `MASTER` | Pode cadastrar, listar e visualizar todos os usuários e clientes |
| `ADVOGADO` | Acesso apenas aos clientes e fichas que ele mesmo cadastrou  |

## 🧪 Instalação e execução local

### 1. Clonar o repositório

```bash
git clone https://github.com/Geeh17/SistemaAdvogados.git
cd SistemaAdvogados/backend
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Criar o banco de dados e aplicar o schema

Configure a variável `DATABASE_URL` no arquivo `.env`, exemplo:

```
DATABASE_URL="mysql://usuario:senha@localhost:3306/sistemadb"
JWT_SECRET="segredo"
```

Depois execute:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Iniciar a aplicação

```bash
npm run dev
```

## 📥 Endpoints principais

| Método | Rota                       | Descrição                                   |
|--------|----------------------------|---------------------------------------------|
| POST   | `/usuarios`                | Cria um novo usuário                        |
| GET    | `/usuarios`                | Lista todos os usuários (MASTER)            |
| POST   | `/clientes`                | Cadastra um novo cliente                    |
| GET    | `/clientes`                | Lista os clientes do advogado logado        |
| POST   | `/fichas/:clienteId`       | Cria ficha para cliente                     |
| GET    | `/fichas/:clienteId`       | Lista fichas de um cliente específico       |
| GET    | `/fichas/:id/pdf`          | Gera PDF de uma ficha                       |
| GET    | `/dashboard`               | Exibe total de clientes e fichas            |

