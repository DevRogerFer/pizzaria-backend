"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importando a biblioteca express
const express_1 = __importDefault(require("express"));
// importando a biblioteca do express para tratativas de erros
require("express-async-errors");
// importando a biblioteca cors para permitir requisições de outros domínios
const cors_1 = __importDefault(require("cors"));
// importando o path para manipulação de caminhos de arquivos
const path_1 = __importDefault(require("path"));
// importando o router do arquivo de rotas
const routes_1 = require("./routes");
// importando biblioteca para upload de imagens
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// criando o express
const app = (0, express_1.default)();
// indicar ao express o tipo de dado: json
app.use(express_1.default.json());
// middleware cors para permitir requisições de outros domínios
app.use((0, cors_1.default)());
// middleware para upload de arquivos
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } // limitando o tamanho do arquivo para 50MB
}));
// indicando o caminho das rotas (roteamento)
app.use(routes_1.router);
// middleware path para servir arquivos estáticos
// acessar url da imagem; ex.: http://localhost:3333/files/nomedaimagem.jpg
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
// criando um middleware
app.use((err, req, res, next) => {
    // verificando se o que está sendo recebido é um instância de um erro
    if (err instanceof Error) {
        // se for uma instância do tipo error, lança uma exceção
        res.status(400).json({
            error: err.message
        });
    }
    // se for outro tipo de error, lança um InternalServerError
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error.'
    });
});
// inicializando o projeto
app.listen(process.env.PORT, () => console.log('Servidor online!')); //3333: porta
