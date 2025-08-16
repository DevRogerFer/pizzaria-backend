import crypto from 'crypto';
import multer from 'multer';
import { extname, resolve } from 'path';

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    // Gerando o hash do arquivo
                    const fileHash = crypto.randomBytes(6).toString('hex');
                    // Extraindo a extensão do arquivo
                    const fileName = `${fileHash}-${file.originalname}`;

                    callback(null, fileName);
                }
            })
        }

    }
}