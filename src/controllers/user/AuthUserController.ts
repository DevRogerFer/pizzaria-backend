// importando o express
import {Request, Response} from 'express'
// importando o serviço
import {AuthUserService} from '../../services/user/AuthUserService'

// criando a classe
class AuthUserController {
    async handle(req: Request, res: Response) {
        const {email, password} = req.body;
        // inicializando o serviço
        const authUserService = new AuthUserService();
        // chamando o método
        const auth = await authUserService.execute({ 
            email,
            password,
        });
        res.json({auth});
    }
}

export {AuthUserController};