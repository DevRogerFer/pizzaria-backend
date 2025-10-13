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
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
// importando a biblioteca para comparar senhas
const bcryptjs_1 = require("bcryptjs");
// importando a biblioteca para gerar tokens JWT
const jsonwebtoken_1 = require("jsonwebtoken");
// criando a classe
class AuthUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            // verificando se o email existe
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error("User/Password incorrect!");
            }
            // verificando se a senha está correta
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new Error("User/Password incorrect!");
            }
            // se tudo estiver correto, gerar o token JWT
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email,
            }, process.env.JWT_SECRET, // chave secreta do JWT
            {
                subject: user.id, // id do usuário
                expiresIn: "30d" // tempo de expiração do token
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token // retornando o token
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
