import express from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());

// Configuração CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : [
        'http://localhost:3000', 
        'http://localhost:3001',
        'https://pizzaria-frontend-production.up.railway.app'
    ];

app.use(cors({
    origin: (origin, callback) => {
        // Permite requisições sem origin (mobile apps, Postman, etc)
        if (!origin) return callback(null, true);
        
        // Em desenvolvimento, permite todas as origens
        if (process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }
        
        // Em produção, verifica lista de origens permitidas
        if (allowedOrigins.some(allowed => origin.includes(allowed.replace('https://', '').replace('http://', '')))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    limitHandler: (_req, res) => {
        res.status(413).json({ error: 'File size limit exceeded (max 50MB)' });
    }
}));

app.use(router);

// Error handling middleware
app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    
    // Em produção, não expõe detalhes do erro
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    return res.status(err.statusCode || 500).json({
        status: "error",
        message: isDevelopment ? err.message : "Internal Server Error",
        ...(isDevelopment && { stack: err.stack })
    });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});