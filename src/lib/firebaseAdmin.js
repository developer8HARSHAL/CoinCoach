// lib/firebase-admin.js
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

if (!admin.apps.length) {
  let serviceAccount;
  
  // Option 1: Use file path (current method)
  if (process.env.FIREBASE_ADMIN_CREDENTIALS_PATH) {
    serviceAccount = JSON.parse(
      fs.readFileSync(path.resolve(process.env.FIREBASE_ADMIN_CREDENTIALS_PATH), 'utf-8')
    );
  }
  // Option 2: Use JSON string from environment variable (better for deployment)
  else if (process.env.FIREBASE_ADMIN_CREDENTIALS_JSON) {
    serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS_JSON);
  }
  // Option 3: Use individual environment variables
  else {
    serviceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
    };
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();

export { auth, admin };