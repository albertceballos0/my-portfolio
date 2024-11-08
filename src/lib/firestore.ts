import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Carga el archivo JSON de la cuenta de servicio
const serviceAccount = {
  type: process.env.NEXT_PUBLIC_SA_TYPE,
  project_id: process.env.NEXT_PUBLIC_SA_PROJECT_ID,
  private_key_id: process.env.NEXT_PUBLIC_SA_PRIVATE_KEY_ID,
  private_key: process.env.NEXT_PUBLIC_SA_PRIVATE_KEY,
  client_email: process.env.NEXT_PUBLIC_SA_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_SA_CLIENT_ID,
  auth_uri: process.env.NEXT_PUBLIC_SA_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_SA_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_SA_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.NEXT_PUBLIC_SA_CLIENT_X509_CERT_URL,
  universe_domain: process.env.NEXT_PUBLIC_SA_UNIVERSE_DOMAIN
}

// Inicializa Firebase Admin con las credenciales de la cuenta de servicio
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
}

export const db = getFirestore();
