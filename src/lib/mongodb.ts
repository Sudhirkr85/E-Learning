import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  retryWrites: true,
  retryReads: true,
  tls: true,
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const isValidMongoUri = (str?: string): boolean => {
  if (!str) return false;
  const trimmed = str.trim();
  return trimmed.startsWith('mongodb://') || trimmed.startsWith('mongodb+srv://');
};

function getClientPromise(): Promise<MongoClient> | null {
  if (!isValidMongoUri(uri)) {
    return null;
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      try {
        client = new MongoClient(uri!, options);
        global._mongoClientPromise = client.connect().catch((err) => {
          console.warn('MongoDB connection failed:', err.message);
          global._mongoClientPromise = undefined;
          throw err;
        });
      } catch (err) {
        return null;
      }
    }
    return global._mongoClientPromise;
  } else {
    if (!clientPromise) {
      try {
        client = new MongoClient(uri!, options);
        clientPromise = client.connect().catch((err) => {
          console.warn('MongoDB connection failed:', err.message);
          clientPromise = null;
          throw err;
        });
      } catch (err) {
        return null;
      }
    }
    return clientPromise;
  }
}

export async function getDatabase(): Promise<Db> {
  const promise = getClientPromise();
  if (!promise) {
    throw new Error('MongoDB is not configured with a valid connection string.');
  }

  try {
    const connectedClient = await promise;
    return connectedClient.db('sssam-academy');
  } catch (error: any) {
    throw new Error(`MongoDB connection error: ${error?.message || error}`);
  }
}

export default clientPromise;
