import {Request, Response} from 'express';
import {CreateUserService} from '../../services/user/CreateUserService'
// criando a classe
class CreateUserController{
    // método assíncrono
    async handle(req: Request, res: Response){
        // desconstruir os parâmetros do body
        const {name, email, password} = req.body;
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({
            name,
            email,
            password
        });
        res.json({user});
    }
}

export {CreateUserController};