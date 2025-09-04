// importando as tipagens do prisma client
//import {PrismaClient} from '@prisma/client';
import {PrismaClient} from '../generated/prisma/client';
// inicializando
const prismaClient = new PrismaClient();
// exportando para ser utilizado em outros arquivos do projeto
export default prismaClient;