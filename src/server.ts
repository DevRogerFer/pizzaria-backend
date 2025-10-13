// importando a biblioteca express
import express, {Request, Response, NextFunction} from 'express';
// importando a biblioteca do express para tratativas de erros
import 'express-async-errors';
// importando a biblioteca cors para permitir requisições de outros domínios
import cors from 'cors';
// importando o path para manipulação de caminhos de arquivos
import path from 'path';
// importando o router do arquivo de rotas
import {router} from './routes';
// importando biblioteca para upload de imagens
import fileUpload from 'express-fileupload';

// criando o express
const app = express()
// indicar ao express o tipo de dado: json
app.use(express.json());
// middleware cors para permitir requisições de outros domínios
app.use(cors());
// middleware para upload de arquivos
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024} // limitando o tamanho do arquivo para 50MB
}))
// indicando o caminho das rotas (roteamento)
app.use(router);
// middleware path para servir arquivos estáticos
// acessar url da imagem; ex.: http://localhost:3333/files/nomedaimagem.jpg

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

// criando um middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // verificando se o que está sendo recebido é um instância de um erro
    if (err instanceof Error) {
        // se for uma instância do tipo error, lança uma exceção
        res.status(400).json({
            error: err.message
        })
    }
    // se for outro tipo de error, lança um InternalServerError
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error.'
    })
})
// inicializando o projeto
 app.listen(process.env.PORT, () => console.log('Servidor online!'));    //3333: porta
