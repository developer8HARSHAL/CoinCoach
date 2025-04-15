// lib/firebase-admin.js
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const serviceAccountPath = process.env.FIREBASE_ADMIN_CREDENTIALS_PATH;

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    fs.readFileSync(path.resolve(serviceAccountPath), 'utf-8')
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();

export { auth, admin };
