# Controle Leiteiro - Backend (API)

> API RESTful robusta e segura, desenvolvida em Node.js com Express e Sequelize, servindo como o núcleo de dados e lógica de negócios para a aplicação de Controle Leiteiro.

<p align="center">
  <img alt="Status do Projeto" src="https://img.shields.io/badge/status-BETA-yellow">
  <img alt="CI/CD" src="https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white">
  <img alt="Tecnologia Principal" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img alt="Framework" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img alt="Banco de Dados" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
  <img alt="Testes" src="https://img.shields.io/badge/Tests-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
  <img alt="Licença" src="https://img.shields.io/badge/license-Proprietária-red">
</p>

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades da API](#-funcionalidades-da-api)
- [Arquitetura e Conceitos Aplicados](#-arquitetura-e-conceitos-aplicados)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura de Deploy e Infraestrutura](#-arquitetura-de-deploy-e-infraestrutura)
- [Rotas da API](#-rotas-da-api)
- [Autor](#-autor)
- [Licença](#-licença)

## 📖 Sobre o Projeto

Este repositório contém o código-fonte do back-end para o **App Controle Leiteiro**. Ele foi projetado para ser o "cérebro" da aplicação, responsável por todas as regras de negócio, pela segurança dos dados e pela comunicação com o banco de dados PostgreSQL.

A API segue os princípios RESTful, oferecendo endpoints bem definidos para que o front-end (ou qualquer outro cliente) possa consumir os dados de forma eficiente e segura.

## ✨ Funcionalidades da API

- 🔐 **Autenticação Segura:** Sistema completo de registro e login de produtores com senhas criptografadas e autenticação baseada em tokens JWT (JSON Web Tokens).
- 🗂️ **Gerenciamento Completo (CRUD):** Endpoints para Criar, Ler, Atualizar e Deletar os principais recursos da aplicação:
  - Produtores (`Farmers`)
  - Fazendas (`Farms`)
  - Animais (`Animals`)
  - Registros de Controle Leiteiro (`Dairy Controls`)
- 🛡️ **Rotas Protegidas:** Utilização de middleware para garantir que apenas usuários autenticados possam acessar endpoints sensíveis.
- 📈 **Lógica de Negócio:** Centralização de cálculos, como médias de produção e outras regras, diretamente na API para garantir a consistência dos dados.
- 📄 **Logging Estruturado:** Sistema de logs com Winston para monitoramento de atividades e erros, facilitando a depuração em ambiente de desenvolvimento e produção.

## 💡 Arquitetura e Conceitos Aplicados

- **API RESTful com Express.js:** A arquitetura é baseada no padrão REST, utilizando o framework Express para a criação de rotas, manipulação de requisições/respostas e gerenciamento de middlewares.

- **ORM com Sequelize:** A interação com o banco de dados PostgreSQL é abstraída pelo ORM Sequelize. Isso permite um desenvolvimento mais ágil e seguro, utilizando `Models` para representar as tabelas e evitando a escrita de SQL manual (`raw SQL`).

- **Autenticação JWT (Token-Based):**
  - As senhas dos usuários são criptografadas com **bcryptjs** antes de serem salvas no banco de dados.
  - No login, um token JWT é gerado e assinado com **jsonwebtoken**.
  - O middleware **express-jwt** é usado para proteger as rotas, validando o token a cada requisição.

- **Testes Automatizados:** A qualidade e a estabilidade da API são garantidas por uma suíte de testes automatizados.
  - **Jest:** Utilizado como o framework principal para rodar os testes.
  - **Supertest:** Usado para realizar testes de integração nos endpoints HTTP, simulando requisições e validando as respostas da API.

- **Qualidade de Código com ESLint:** O projeto utiliza o ESLint com a configuração `standard` para garantir um padrão de código consistente, limpo e livre de erros comuns.

- **Gerenciamento de Ambiente com `dotenv`:** As variáveis de ambiente (chaves de API, senhas de banco de dados, segredo do JWT) são gerenciadas de forma segura através de um arquivo `.env`, mantendo os dados sensíveis fora do código-fonte.

- **Middleware `cors`:** Configurado para permitir requisições apenas do domínio do front-end em produção, garantindo que a API não seja consumida por clientes não autorizados.

## 💻 Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **Node.js** | Ambiente de execução do JavaScript no servidor. |
| **Express.js**| Framework para construção da API e gerenciamento de rotas. |
| **Sequelize** | ORM (Object-Relational Mapper) para interagir com o banco de dados. |
| **PostgreSQL**| Banco de dados relacional robusto para persistência dos dados. |
| **JWT (jsonwebtoken)**| Para criação de tokens de autenticação. |
| **bcryptjs** | Para criptografia de senhas. |
| **Winston** | Biblioteca para logging de eventos e erros da aplicação. |
| **Jest & Supertest** | Frameworks para a escrita e execução de testes automatizados. |
| **ESLint** | Ferramenta para linting e padronização do código. |
| **Nodemon** | Para reiniciar o servidor automaticamente durante o desenvolvimento. |

## 🏗️ Arquitetura de Deploy e Infraestrutura

Para garantir a entrega contínua, escalabilidade e segurança, o projeto adota uma arquitetura de infraestrutura moderna e automatizada.

#### Integração e Entrega Contínua (CI/CD)
O projeto possui um fluxo de CI/CD robusto automatizado com **GitHub Actions**. O workflow é acionado em cada `push` ou `pull request` para a branch `main` e realiza as seguintes etapas:
- **Build da Imagem Docker:** A aplicação é empacotada em uma imagem Docker para garantir um ambiente consistente.
- **Assinatura da Imagem:** A imagem é assinada usando **Sigstore/Cosign**, uma prática de segurança que garante a integridade e a proveniência do artefato.
- **Publicação no Registry:** A imagem Docker é enviada para um container registry (Docker Hub e/ou GitHub Container Registry), pronta para o deploy.

#### Hospedagem da Aplicação (Deploy)
A imagem Docker gerada pelo pipeline de CI/CD é implantada na plataforma **Render**. O Render gerencia o deploy contínuo, monitorando o registry e atualizando a aplicação automaticamente a cada nova imagem publicada, garantindo que a versão em produção esteja sempre sincronizada com a branch `main`.

#### Banco de Dados na Nuvem
Para garantir alta disponibilidade, segurança e escalabilidade, o banco de dados PostgreSQL é gerenciado e hospedado na plataforma **Aiven**. O uso de um serviço de banco de dados gerenciado abstrai a complexidade de manutenção, backups e atualizações, permitindo que o foco permaneça no desenvolvimento da aplicação.

## 🗺️ Rotas da API

Uma visão geral das principais rotas disponíveis:

| Método | Rota | Descrição | Protegida? |
| :--- | :--- | :--- | :--- |
| `POST` | `/farmer/register` | Registra um novo produtor. | ❌ Não |
| `POST` | `/farmer/login` | Autentica um produtor e retorna um token JWT. | ❌ Não |
| `GET` | `/farm` | Retorna as fazendas do produtor logado. | ✅ Sim |
| `POST` | `/farm` | Cadastra uma nova fazenda. | ✅ Sim |
| `GET` | `/animal` | Lista os animais de uma fazenda. | ✅ Sim |
| `POST` | `/animal` | Cadastra um novo animal. | ✅ Sim |
| `POST`| `/dairy-control`| Registra uma nova pesagem de leite. | ✅ Sim |

_(Esta é uma lista simplificada. A API contém mais rotas para atualização e exclusão de recursos)_

## 👨‍💻 Autor
<img src="./public/frc.png" width=120px>

Fernando R Costa

<p>
<a href="https://www.linkedin.com/in/fernando-r-costa/" target="_blank">
<img alt="LinkedIn" src="https://www.google.com/search?q=https://img.shields.io/badge/LinkedIn-0077B5%3Fstyle%3Dfor-the-badge%26logo%3Dlinkedin%26logoColor%3Dwhite">
</a>
<a href="https://www.google.com/search?q=https://www.instagram.com/fernandorcosta25/" target="_blank">
<img alt="Instagram" src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white">
</a>
<a href="https://www.google.com/search?q=https://www.youtube.com/%40controleleiteiro" target="_blank">
<img alt="YouTube" src="https://www.google.com/search?q=https://img.shields.io/badge/YouTube-FF0000%3Fstyle%3Dfor-the-badge%26logo%3Dyoutube%26logoColor%3Dwhite">
</a>
</p>

## 📄 Licença
Este projeto está sob uma licença Proprietária. A visualização do código é permitida exclusivamente para fins de portfólio e demonstração de habilidades.

Consulte o arquivo LICENSE para mais detalhes.