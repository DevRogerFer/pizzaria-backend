"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
// importando a biblioteca de autenticação
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    // recebendo o token
    const authToken = req.headers.authorization;
    // verificando se o token existe
    if (!authToken) {
        res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    // validando o token
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // recuperando o id do token e colocando dentro de uma variável user_id dentro do req
        req.user_id = sub;
        return next();
    }
    catch (err) {
        res.status(401).end();
    }
}
