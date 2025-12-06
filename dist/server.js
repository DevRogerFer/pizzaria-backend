"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configuração CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [
        'http://localhost:3000',
        'http://localhost:3001'
    ];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Permite requisições sem origin (mobile apps, Postman, etc)
        if (!origin)
            return callback(null, true);
        // Em desenvolvimento, permite todas as origens
        if (process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }
        // Em produção, verifica lista de origens permitidas
        if (allowedOrigins.some(allowed => origin.includes(allowed.replace('https://', '').replace('http://', '')))) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    limitHandler: (_req, res) => {
        res.status(413).json({ error: 'File size limit exceeded (max 50MB)' });
    }
}));
app.use(routes_1.router);
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error(err);
    // Em produção, não expõe detalhes do erro
    const isDevelopment = process.env.NODE_ENV === 'development';
    return res.status(err.statusCode || 500).json(Object.assign({ status: "error", message: isDevelopment ? err.message : "Internal Server Error" }, (isDevelopment && { stack: err.stack })));
});
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
