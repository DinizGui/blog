import 'server-only'
import { cert, getApp, getApps, initializeApp, type App } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'

const ENV_MISSING_MSG =
  'Firebase admin envs ausentes. Defina FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY e FIREBASE_STORAGE_BUCKET no .env.'

function readEnv() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET

  if (!projectId || !clientEmail || !privateKey || !storageBucket) {
    throw new Error(ENV_MISSING_MSG)
  }

  return { projectId, clientEmail, privateKey, storageBucket }
}

function getFirebaseApp(): App {
  if (getApps().length) return getApp()
  const { projectId, clientEmail, privateKey, storageBucket } = readEnv()
  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket,
  })
}

export function getBucket() {
  return getStorage(getFirebaseApp()).bucket()
}
