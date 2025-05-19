import admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  let serviceAccount;

  // Try to get credentials from environment variable (JSON string)
  if (process.env.FIREBASE_ADMIN_CREDENTIALS_JSON) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS_JSON);
    } catch (error) {
      console.error('Error parsing Firebase admin credentials:', error);
    }
  }

  // Fallback to individual environment variables
  if (!serviceAccount) {
    serviceAccount = {
      type: 'service_account',
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
      universe_domain: 'googleapis.com'
    };
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export default admin;