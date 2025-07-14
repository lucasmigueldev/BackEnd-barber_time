import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
  


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../config/firebaseKey.json'), 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://backend-barber-97643-default-rtdb.firebaseio.com/"
});

const db = admin.database();
const auth = admin.auth();

export { db, auth };

