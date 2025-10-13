"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
// importando o acesso ao banco de dados
const prisma_1 = __importDefault(require("../../prisma"));
// importando a biblioteca para criptografar senha
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            // verificando se foi enviado um e-mail
            if (!email) {
                throw new Error("Email incorrect!");
            }
            // verificando se o e-mail já está cadastrado na plataforma
            const userAlreadyExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email // onde e-mail (cadastrado) = email (recebido)
                }
            });
            // se já existir
            if (userAlreadyExists) {
                throw new Error("User already exists!"); // Usuário já existe
            }
            // criptografando a senha
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            // cadastrando o usuário no banco de dados
            const user = yield prisma_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash, // salvando a senha criptografada
                },
                // selecionando o que será devolvido
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
