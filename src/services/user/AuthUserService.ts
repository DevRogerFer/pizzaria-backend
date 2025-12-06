import prismaClient from "../../prisma";
// importando a biblioteca para comparar senhas
import {compare} from 'bcryptjs';
// importando a biblioteca para gerar tokens JWT
import {sign} from 'jsonwebtoken';
// importando utilitários de validação
import { validateAndSanitizeEmail } from '../../utils/validation';


// criando a interface
interface AuthRequest {
    email: string;
    password: string;
}

// criando a classe
class AuthUserService {
    async execute({email, password}: AuthRequest){
        // Validando e sanitizando email
        const sanitizedEmail = validateAndSanitizeEmail(email);
        
        if (!password) {
            throw new Error("Password is required");
        }
        
        // verificando se o email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: sanitizedEmail
            }
        });

        if (!user) {
            throw new Error("User/Password incorrect!");
        }

        // verificando se a senha está correta
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("User/Password incorrect!");
        }

        // se tudo estiver correto, gerar o token JWT
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET, // chave secreta do JWT
            {
                subject: user.id, // id do usuário
                expiresIn: "30d" // tempo de expiração do token
            }
        )     
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token // retornando o token
        };
    }
}

// exporta a classe
export {AuthUserService};