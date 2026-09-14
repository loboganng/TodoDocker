# Projeto 001: Docker — Aplicação Web Contêinerizada

**Disciplina:** DEVOPS Tools
**Professor:** Renato Sousa Botacim
**Aluno:** Wolfgang Neve & Miguel Coelho
**Turma:** AN3TN

## 1. Qual é o objetivo da aplicação?

O projeto consiste em uma **lista de tarefas (To-do list)** web que permite criar, concluir/desfazer e excluir tarefas. O objetivo é demonstrar, na prática, o funcionamento do **Docker**: criação de imagens com **Dockerfile (multi-stage build)**, execução de múltiplos contêineres com **Docker Compose**, persistência de dados com **volumes**, integração entre **aplicação web e banco de dados**, uso de **variáveis de ambiente** e **redes Docker**.

## 2. Quais tecnologias foram utilizadas?

- **Node.js + Express** — aplicação web e API REST.
- **Prisma ORM** — manipulação do banco de dados de forma simples e tipada.
- **MySQL 8.4** — banco de dados relacional.
- **HTML + CSS + JavaScript (vanilla)** — frontend simples servido pelo Express.
- **Docker / Docker Compose** — conteinerização e orquestração dos serviços.

## 3. Como executar o projeto?

Pré-requisito: Docker e Docker Compose instalados.

```bash
docker compose up --build
```

Para rodar em segundo plano (background):

```bash
docker compose up -d --build
```

## 4. Qual porta deve ser acessada?

A aplicação é acessada em **http://localhost:3000**.

A porta é definida pela variável `PORT` no arquivo `.env` (padrão: `3000`). O banco MySQL é exposto na porta **3307** do host (evita conflito com um MySQL local em `3306`).

## 5. Quais containers são utilizados?

| Container | Imagem | Função |
|---|---|---|
| `todo-db` | `mysql:8.4` | Banco de dados MySQL |
| `todo-app` | `todo-app` (construída pelo Dockerfile) | Aplicação web Node.js |

Para ver os contêineres em execução:

```bash
docker ps
```

## 6. Qual banco de dados é utilizado?

**MySQL 8.4**, executado no contêiner `todo-db`. A tabela `tasks` é criada automaticamente pelo Prisma (`prisma db push`) no primeiro boot. Nome do banco: `todo` (definido por `DB_NAME` no `.env`).

## 7. Qual volume foi criado?

O volume nomeado **`todo_db_data`**, montado em `/var/lib/mysql` do contêiner `todo-db`. Ele garante que os dados persistam mesmo após parar/remover os contêineres.

Para listar os volumes:

```bash
docker volume ls
```

## 8. Qual rede foi criada?

O Docker Compose cria automaticamente a rede **`projetocomdocker_default`** (rede bridge). Os contêineres `todo-db` e `todo-app` se comunicam por essa rede através do nome do serviço (`db`).

Para listar as redes:

```bash
docker network ls
```

## 9. Quais variáveis de ambiente são utilizadas?

Definidas no arquivo `.env` e usadas pelo `docker-compose.yml`:

| Variável | Descrição | Padrão |
|---|---|---|
| `DB_NAME` | Nome do banco de dados | `todo` |
| `DB_USER` | Usuário do banco | `todo` |
| `DB_PASSWORD` | Senha do usuário | `todo123` |
| `MYSQL_ROOT_PASSWORD` | Senha do usuário root do MySQL | `root123` |
| `PORT` | Porta do host onde a aplicação roda | `3000` |

Além disso, o contêiner `todo-app` recebe a variável **`DATABASE_URL`** (montada a partir do `.env`), usada pelo Prisma para conectar ao banco:

```
mysql://todo:todo123@db:3306/todo
```

## 10. Como parar o projeto?

```bash
docker compose down
```

Para parar **e remover também o volume** (apaga todos os dados do banco):

```bash
docker compose down -v
```

## Comandos úteis

| Comando | O que faz |
|---|---|
| `docker compose up --build` | Constrói as imagens e sobe os contêineres |
| `docker compose down` | Para e remove os contêineres (mantém o volume) |
| `docker compose down -v` | Para, remove contêineres e apaga o volume |
| `docker compose logs app` | Mostra os logs da aplicação |
| `docker ps` | Lista os contêineres em execução |
| `docker images` | Lista as imagens locais |
| `docker volume ls` | Lista os volumes |
| `docker network ls` | Lista as redes |
| `docker exec -it todo-db mysql -utodo -p` | Abre o terminal MySQL dentro do contêiner |

## Arquitetura

```
[ Frontend HTML/JS ]  →  [ todo-app (Node.js + Prisma) ]  →  [ todo-db (MySQL) ]
        localhost:3000         rede: projetocomdocker_default        volume: todo_db_data
```