"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importando as tipagens do prisma client
//import {PrismaClient} from '@prisma/client';
const client_1 = require("@prisma/client");
// inicializando
const prismaClient = new client_1.PrismaClient();
// exportando para ser utilizado em outros arquivos do projeto
exports.default = prismaClient;
