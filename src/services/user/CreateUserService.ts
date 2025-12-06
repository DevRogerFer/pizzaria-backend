// importando o acesso ao banco de dados
import prismaClient from '../../prisma'
// importando a biblioteca para criptografar senha
import {hash} from 'bcryptjs'
// importando utilitários de validação
import { validateAndSanitizeEmail, validatePassword, validateName } from '../../utils/validation'

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        // Validando e sanitizando os dados de entrada
        const sanitizedEmail = validateAndSanitizeEmail(email);
        const sanitizedName = validateName(name);
        validatePassword(password);

        // verificando se o e-mail já está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: sanitizedEmail
            }
        })

        // se já existir
        if (userAlreadyExists) {
            throw new Error("User already exists!") // Usuário já existe
        }

        // criptografando a senha
        const passwordHash = await hash(password, 8)

        // cadastrando o usuário no banco de dados
        const user = await prismaClient.user.create({
            data: {
                name: sanitizedName,
                email: sanitizedEmail,
                password: passwordHash, // salvando a senha criptografada
            },
            // selecionando o que será devolvido
            select: {
                id: true,
                name: true,
                email: true,                
            }
        })

        return user;
    }
}

export {CreateUserService}