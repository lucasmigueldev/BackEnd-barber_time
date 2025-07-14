import admin from 'firebase-admin';

  
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://backend-barber-97643-default-rtdb.firebaseio.com/"
});

const db = admin.database();
const auth = admin.auth();

export { db, auth };

