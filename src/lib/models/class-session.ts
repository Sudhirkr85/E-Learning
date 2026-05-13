import { ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';

export interface ClassSession {
  _id?: ObjectId;
  courseId: string;
  googleMeetLink: string;
  sessionTitle: string;
  description?: string;
  sessionDate: string; // ISO string
  sessionTime: string; // HH:mm format (e.g., "10:30")
  durationMinutes: number; // e.g., 60
  recordingLink?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseContact {
  _id?: ObjectId;
  courseId: string;
  supportEmail: string;
  supportPhone: string;
  instructorName: string;
  instructorEmail?: string;
  officeHours?: string; // e.g., "Monday-Friday 9AM-6PM IST"
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
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(session);
    return { ...session, _id: result.insertedId };
  }

  static async findByCourseId(courseId: string): Promise<ClassSession[]> {
    const collection = await this.getCollection();
    const sessions = await collection
      .find({ courseId })
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

export class CourseContactModel {
  private static getCollection() {
    return getDatabase().then(db => db.collection<CourseContact>('courseContacts'));
  }

  static async createOrUpdate(contactData: Omit<CourseContact, '_id' | 'createdAt' | 'updatedAt'>): Promise<CourseContact> {
    const collection = await this.getCollection();
    const now = new Date();
    
    const existing = await collection.findOne({ courseId: contactData.courseId });
    
    if (existing) {
      await collection.updateOne(
        { courseId: contactData.courseId },
        {
          $set: {
            ...contactData,
            updatedAt: now,
          }
        }
      );
      return { ...existing, ...contactData, updatedAt: now };
    }

    const contact: CourseContact = {
      ...contactData,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(contact);
    return { ...contact, _id: result.insertedId };
  }

  static async findByCourseId(courseId: string): Promise<CourseContact | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ courseId });
  }

  static async updateByCourseId(courseId: string, updateData: Partial<Omit<CourseContact, '_id' | 'createdAt'>>): Promise<boolean> {
    const collection = await this.getCollection();
    
    const result = await collection.updateOne(
      { courseId },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        }
      }
    );
    
    return result.modifiedCount > 0 || result.upsertedCount > 0;
  }
}
