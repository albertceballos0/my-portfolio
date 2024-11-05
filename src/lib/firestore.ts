import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Carga el archivo JSON de la cuenta de servicio
const serviceAccount = {
  type: process.env.SA_TYPE,
  project_id: process.env.SA_PROJECT_ID,
  private_key_id: process.env.SA_PRIVATE_KEY_ID,
  private_key: process.env.SA_PRIVATE_KEY,
  client_email: process.env.SA_CLIENT_EMAIL,
  client_id: process.env.SA_CLIENT_ID,
  auth_uri: process.env.SA_AUTH_URI,
  token_uri: process.env.SA_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.SA_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.SA_CLIENT_X509_CERT_URL,
  universe_domain: process.env.SA_UNIVERSE_DOMAIN
}

console.log(process.env.SA_UNIVERSE_DOMAIN);
// Inicializa Firebase Admin con las credenciales de la cuenta de servicio
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
}

export const db = getFirestore();
