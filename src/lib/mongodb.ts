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

// Only initialize MongoDB if URI is provided
if (uri) {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      console.log('📡 Connecting to MongoDB Atlas...');
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client
        .connect()
        .then((connectedClient) => {
          console.log('✓ MongoDB connection initiated (development mode)');
          return connectedClient;
        })
        .catch((err) => {
          console.error('✗ MongoDB connection failed:', err.message);
          throw err;
        });
    }
    clientPromise = global._mongoClientPromise;
  } else {
    console.log('📡 Connecting to MongoDB Atlas...');
    client = new MongoClient(uri, options);
    clientPromise = client
      .connect()
      .then((connectedClient) => {
        console.log('✓ MongoDB connection initiated (production mode)');
        return connectedClient;
      })
      .catch((err) => {
        console.error('✗ MongoDB connection failed:', err.message);
        throw err;
      });
  }
} else {
  console.error('⚠️  MONGODB_URI environment variable is not set');
}

export async function getDatabase(): Promise<Db> {
  if (!clientPromise) {
    throw new Error('MongoDB is not configured. Please add MONGODB_URI to your environment variables.');
  }
  
  try {
    const client = await clientPromise;
    const db = client.db('sssam-academy');
    console.log('✓ Database connection successful: sssam-academy');
    return db;
  } catch (error: any) {
    console.error('✗ Database connection error:', {
      message: error?.message,
      code: error?.code,
      reason: error?.reason?.type,
    });
    throw error;
  }
}

export default clientPromise;
