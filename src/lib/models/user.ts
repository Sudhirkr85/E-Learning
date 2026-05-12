import { Db, ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';

export interface User {
  _id?: ObjectId;
  clerkId: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserModel {
  private static getCollection() {
    return getDatabase().then(db => db.collection<User>('users'));
  }

  static async create(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const collection = await this.getCollection();
    const user: User = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await collection.insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  static async findByClerkId(clerkId: string): Promise<User | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ clerkId });
  }

  static async findByEmail(email: string): Promise<User | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ email });
  }

  static async updateByClerkId(clerkId: string, updateData: Partial<User>): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.updateOne(
      { clerkId },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
    return result.modifiedCount > 0;
  }

  static async syncUserWithClerk(clerkUser: {
    id: string;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    imageUrl?: string;
  }): Promise<User> {
    const existingUser = await this.findByClerkId(clerkUser.id);
    
    const name = clerkUser.firstName && clerkUser.lastName 
      ? `${clerkUser.firstName} ${clerkUser.lastName}`
      : clerkUser.firstName || 'User';
    
    const userData = {
      clerkId: clerkUser.id,
      name,
      email: clerkUser.emailAddress || '',
      role: 'student' as const,
      avatar: clerkUser.imageUrl,
    };

    if (existingUser) {
      // Update existing user
      await this.updateByClerkId(clerkUser.id, userData);
      return { ...existingUser, ...userData, updatedAt: new Date() };
    } else {
      // Create new user
      return await this.create(userData);
    }
  }
}
