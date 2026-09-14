

# 

# **Projeto 001 :: DOCKER**

# **Aplicação Web Conteinerizada**

# **DOCKER**

**Disciplina:** DEVOPS Tools  
**Professor:** Renato Sousa Botacim  
**Aluno:**  
**Turma:**  
**Data:**

[**Contextualização	2**](#contextualização)

[**Objetivo	2**](#objetivo)

[**Projeto	3**](#projeto)

[Arquitetura mínima solicitada	3](#arquitetura-mínima-solicitada)

[Requisitos obrigatórios	4](#requisitos-obrigatórios)

[README deverá responder às seguintes perguntas:	4](#readme-deverá-responder-às-seguintes-perguntas:)

# 

# **Contextualização** {#contextualização}

Atualmente, o desenvolvimento de aplicações exige cada vez mais praticidade, organização e facilidade para executar sistemas em diferentes ambientes. Nesse contexto, tecnologias de virtualização e conteinerização tornaram-se importantes para facilitar o desenvolvimento, a implantação e o gerenciamento de aplicações.

O Docker é uma plataforma que utiliza contêineres para empacotar uma aplicação juntamente com suas dependências, permitindo que ela seja executada de maneira padronizada em diferentes ambientes. Diferentemente das máquinas virtuais tradicionais, os contêineres compartilham o kernel do sistema operacional, tornando seu uso mais leve e rápido.

Dessa forma, o estudo do Docker possibilita compreender conceitos fundamentais relacionados à criação, execução e gerenciamento de contêineres, além do uso de imagens, volumes, redes, variáveis de ambiente e arquivos Dockerfile. Também permite conhecer o Docker Compose, ferramenta que facilita a execução de aplicações compostas por múltiplos serviços, como uma aplicação web integrada a um banco de dados.

A partir desses conhecimentos, a atividade prática propõe o desenvolvimento, em dupla, de uma pequena aplicação web utilizando Docker. O projeto permitirá aplicar os conceitos estudados em uma situação próxima à realidade do desenvolvimento de software, proporcionando experiência na criação de imagens, execução de contêineres, persistência de dados e integração entre diferentes serviços.

# **Objetivo** {#objetivo}

O objetivo dessas atividades são:

* Explicar a diferença entre máquinas virtuais e contêineres;  
* Compreender a arquitetura do Docker;  
* Criar e executar contêineres;  
* Trabalhar com imagens e Docker Hub;  
* Criar imagens utilizando Dockerfile;  
* Utilizar portas e variáveis de ambiente;  
* Persistir dados utilizando volumes;  
* Criar redes Docker;  
* Utilizar boas práticas em Dockerfiles;  
* Criar imagens com Multi-stage Build;  
* Utilizar Docker Compose;  
* Executar uma aplicação web junto com um banco de dados em contêineres.

# 

# **Projeto** {#projeto}

Cada dupla deverá criar uma pequena aplicação web utilizando Docker. Pode ser, por exemplo:

* Lista de tarefas;  
* Cadastro de alunos;  
* Cadastro de produtos;  
* Sistema de biblioteca;  
* Agenda;  
* Catálogo de filmes;  
* Controle de despesas.

### **Arquitetura mínima solicitada** {#arquitetura-mínima-solicitada}

### 

### **Requisitos obrigatórios** {#requisitos-obrigatórios}

O projeto deverá possuir:

* Dockerfile;  
* Docker Compose;  
* Aplicação web;  
* Banco de dados;  
* Volume;  
* Rede Docker;  
* Variáveis de ambiente;  
* `.dockerignore`;  
* README.md;  
* Pelo menos duas imagens/serviços;  
* Aplicação funcionando através de uma porta do host.

### **README deverá responder às seguintes perguntas:** {#readme-deverá-responder-às-seguintes-perguntas:}

1\. Qual é o objetivo da aplicação?  
2\. Quais tecnologias foram utilizadas?  
3\. Como executar o projeto?  
4\. Qual porta deve ser acessada?  
5\. Quais containers são utilizados?  
6\. Qual banco de dados é utilizado?  
7\. Qual volume foi criado?  
8\. Qual rede foi criada?  
9\. Quais variáveis de ambiente são utilizadas?  
10\. Como parar o projeto?