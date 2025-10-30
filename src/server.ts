import express from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}));

app.use(router);

// Error handling middleware
app.use((err: any, _req: any, res: any) => {
    console.error(err);
    return res.status(500).json({
        status: "error",
        message: err.message || "Internal Server Error"
    });
});

// Para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
    app.listen(process.env.PORT || 3333);
}

// Para Vercel
export default app;