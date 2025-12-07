# Projeto Pizzaria Backend
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/DevRogerFer/pizzaria-backend/blob/main/LICENSE)
# Sobre o Projeto

Desenvolvimento do backend de uma aplicação completa para atendimento de uma pizzaria, contemplando a criação da arquitetura do servidor, implementação das regras de negócio e construção de uma API robusta e escalável. 
O projeto inclui a gestão de pedidos, usuários, categorias e produtos, oferecendo suporte integral para as interfaces Web e Mobile. 
O backend foi projetado para garantir segurança, desempenho e integração eficiente entre todos os módulos do sistema, servindo como base central da operação da aplicação.


## Ambiente de Desenvolvimento e Homologação
Estrutura básico do projeto:

![Estrutura Básica](https://github.com/DevRogerFer/pizzaria-backend/blob/main/assets/1.estrutura_basica_projeto.png)

Execução no servidor local:

![Execução no Servidor Local](https://github.com/DevRogerFer/pizzaria-backend/blob/main/assets/2.execucao_servidor.png)

## Banco de Dados
Como base de dados para o ambiente local de homologação e testes e, também, para o ambiente de produção, foi utilizado o PostgreSQL e o Beekeeper Studio para gerenciá-lo:

![Banco de Dados](https://github.com/DevRogerFer/pizzaria-backend/blob/main/assets/3.beekeeper_studio.png)

O Insomnia foi a ferramenta cliente utilizada para testar, depurar e projetar a API Rest por meio de requisições HTTP (GET, POST, PUT e DELETE):

![Insomnia](https://github.com/DevRogerFer/pizzaria-backend/blob/main/assets/4.insomnia.png)

## Ambiente de Produção
API Rest em produção no Railway com deploy via GitHub

![Backend em Produção](https://github.com/DevRogerFer/pizzaria-backend/blob/main/assets/5.backend_producao.png)

Demonstração do banco de dados PostgreSQL implantado e hospedado no Railway:

![PostgreSQL no Railway](https://github.com/DevRogerFer/pizzaria-backend/blob/main/assets/6.postgresql_producao.png)

# Tecnologias utilizadas - Backend (Node.js/Express):
## Core:
  * Node.js - Runtime JavaScript
  * Express - Framework web
  * TypeScript - Linguagem tipada

## Banco de dados:
  * PostgreSQL - Banco de dados relacional
  * Prisma ORM (v6.15.0) - ORM para Node.js
  * pg (v8.16.3) - Driver PostgreSQL

## Autenticação e Segurança:
  * jsonwebtoken (v9.0.2) - Autenticação JWT
  * bcryptjs (v3.0.2) - Criptografia de senhas

## Upload de Arquivos:
  * Cloudinary (v2.7.0) - Armazenamento de imagens na nuvem
  * express-fileupload (v1.5.2) - Upload de arquivos

## Utilitários:
  * cors (v2.8.5) - Cross-Origin Resource Sharing
  * dotenv (v17.2.2) - Variáveis de ambiente
  * express-async-errors (v3.1.1) - Tratamento de erros assíncronos

## Desenvolvimento:
  * ts-node-dev (v2.0.0) - Hot reload para TypeScript
  * @railway/cli (v4.11.0) - CLI do Railway

## Deploy e Infraestrutura:
  * Railway - Plataforma de deploy (PaaS)
  * GitHub - Controle de versão e CI/CD
  * Nixpacks - Build system do Railway

## Ferramentas:
  * Git - Controle de versão
  * npm - Gerenciador de pacotes
  * PowerShell - Terminal

## Stack principal: 
  * Node.js + Express + TypeScript + Prisma + PostgreSQL + Cloudinary

# Autor
Rogério Fernandes Siqueira
