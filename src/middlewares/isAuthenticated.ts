import { NextFunction, Request, Response } from 'express';
// importando a biblioteca de autenticação
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

export function isAuthenticated(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    // recebendo o token
    const authToken = req.headers.authorization;
    // verificando se o token existe
    if(!authToken) {
        res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    // validando o token
    try {
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;
        // recuperando o id do token e colocando dentro de uma variável user_id dentro do req
        req.user_id = sub;

        return next();

    }catch(err){
        res.status(401).end();
    }
}