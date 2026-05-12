import { Db, ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';

export interface Purchase {
  _id?: ObjectId;
  orderId: string;
  paymentId?: string;
  studentId: string;
  studentEmail: string;
  studentName: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'razorpay';
  couponCode?: string;
  discountAmount?: number;
  originalAmount: number;
  taxAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class PurchaseModel {
  private static getCollection() {
    return getDatabase().then(db => db.collection<Purchase>('purchases'));
  }

  static async create(purchaseData: Omit<Purchase, '_id' | 'createdAt' | 'updatedAt'>): Promise<Purchase> {
    const collection = await this.getCollection();
    const purchase: Purchase = {
      ...purchaseData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await collection.insertOne(purchase);
    return { ...purchase, _id: result.insertedId };
  }

  static async findByOrderId(orderId: string): Promise<Purchase | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ orderId });
  }

  static async findByPaymentId(paymentId: string): Promise<Purchase | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ paymentId });
  }

  static async updatePaymentStatus(orderId: string, paymentId: string, status: Purchase['status']): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.updateOne(
      { orderId },
      { 
        $set: { 
          paymentId, 
          status, 
          updatedAt: new Date() 
        } 
      }
    );
    return result.modifiedCount > 0;
  }

  static async findByStudentId(studentId: string): Promise<Purchase[]> {
    const collection = await this.getCollection();
    return await collection.find({ studentId }).sort({ createdAt: -1 }).toArray();
  }

  static async findByStudentIdAndCourseId(studentId: string, courseId: string): Promise<Purchase | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ 
      studentId, 
      courseId, 
      status: 'completed' 
    });
  }

  static async hasStudentPurchasedCourse(studentId: string, courseId: string): Promise<boolean> {
    const purchase = await this.findByStudentIdAndCourseId(studentId, courseId);
    return purchase !== null;
  }
}
