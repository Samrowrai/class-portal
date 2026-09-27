import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable. Add it in Vercel: Settings -> Environment Variables.');
}

// Reuse the connection across serverless invocations instead of opening
// a brand new one on every request.
let cachedClient = global._mongoClientPromise;

if (!cachedClient) {
  const client = new MongoClient(uri);
  cachedClient = client.connect();
  global._mongoClientPromise = cachedClient;
}

export async function getDb() {
  const client = await cachedClient;
  return client.db('studentDB'); // change the database name here if you'd like a different one
}
