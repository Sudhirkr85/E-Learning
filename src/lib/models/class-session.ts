import { ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';

export interface ClassSession {
  _id?: ObjectId;
  courseId: string;
  googleMeetLink: string;
  sessionTitle: string;
  sessionDate: string; // ISO string or YYYY-MM-DD
  sessionTime: string; // HH:mm format (e.g., "10:30")
  active?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ClassSessionModel {
  private static getCollection() {
    return getDatabase().then(db => db.collection<ClassSession>('classSessions'));
  }

  static async createSession(sessionData: Omit<ClassSession, '_id' | 'createdAt' | 'updatedAt'>): Promise<ClassSession> {
    const collection = await this.getCollection();
    const now = new Date();
    
    const session: ClassSession = {
      ...sessionData,
      active: typeof sessionData['active'] === 'boolean' ? sessionData['active'] : true,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(session);
    return { ...session, _id: result.insertedId };
  }

  static async findByCourseId(courseId: string): Promise<ClassSession[]> {
    const collection = await this.getCollection();
    const sessions = await collection
      .find({ courseId } as any)
      .sort({ sessionDate: 1, sessionTime: 1 })
      .toArray();
    return sessions;
  }

  static async findUpcomingSessions(courseId: string, limit: number = 5): Promise<ClassSession[]> {
    const collection = await this.getCollection();
    const now = new Date();
    
    const sessions = await collection
      .find({
        courseId,
        sessionDate: { $gte: now.toISOString() }
      })
      .sort({ sessionDate: 1, sessionTime: 1 })
      .limit(limit)
      .toArray();
    
    return sessions;
  }

  static async updateSession(sessionId: string, updateData: Partial<Omit<ClassSession, '_id' | 'createdAt'>>): Promise<boolean> {
    try {
      const collection = await this.getCollection();
      const objectId = new ObjectId(sessionId);
      
      const result = await collection.updateOne(
        { _id: objectId },
        {
          $set: {
            ...updateData,
            updatedAt: new Date(),
          }
        }
      );
      
      return result.modifiedCount > 0;
    } catch (error) {
      return false;
    }
  }

  static async deleteSession(sessionId: string): Promise<boolean> {
    try {
      const collection = await this.getCollection();
      const objectId = new ObjectId(sessionId);
      
      const result = await collection.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  static async getSessionById(sessionId: string): Promise<ClassSession | null> {
    try {
      const collection = await this.getCollection();
      const objectId = new ObjectId(sessionId);
      return await collection.findOne({ _id: objectId });
    } catch (error) {
      return null;
    }
  }
}
