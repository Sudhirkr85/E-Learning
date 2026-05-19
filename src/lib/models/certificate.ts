import { randomUUID } from 'crypto';
import { ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';

export interface CertificateRequest {
  _id?: ObjectId;
  certificateId: string;
  studentId: string;
  studentName: string;
  studentEmail?: string;
  courseId: string;
  courseSlug?: string;
  courseTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  issueDate?: Date | null;
  approvedBy?: string | null;
  completionDate?: Date | null;
  trainingStartDate?: Date | null;
  trainingEndDate?: Date | null;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

type CertificateCreateInput = Omit<CertificateRequest, '_id' | 'certificateId' | 'createdAt' | 'updatedAt'> & {
  certificateId?: string;
  issueDate?: Date | null;
  approvedBy?: string | null;
  completionDate?: Date | null;
  trainingStartDate?: Date | null;
  trainingEndDate?: Date | null;
};

type CertificateUpdateInput = Partial<Omit<CertificateRequest, '_id' | 'certificateId' | 'studentId' | 'studentName' | 'studentEmail' | 'courseId' | 'courseSlug' | 'courseTitle' | 'createdAt'>>;

export class CertificateModel {
  private static getCollection() {
    return getDatabase().then(db => db.collection<CertificateRequest>('certificates'));
  }

  static generateCertificateId() {
    const shortId = randomUUID().replace(/-/g, '').slice(0, 10).toUpperCase();
    return `SSSAM-${shortId}`;
  }

  static async create(certificateData: CertificateCreateInput): Promise<CertificateRequest> {
    const collection = await this.getCollection();
    const certificate: CertificateRequest = {
      ...certificateData,
      certificateId: certificateData.certificateId || this.generateCertificateId(),
      status: certificateData.status || 'pending',
      issueDate: certificateData.issueDate ?? null,
      approvedBy: certificateData.approvedBy ?? null,
      completionDate: certificateData.completionDate ?? null,
      trainingStartDate: certificateData.trainingStartDate ?? null,
      trainingEndDate: certificateData.trainingEndDate ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(certificate);
    return { ...certificate, _id: result.insertedId };
  }

  static async findByCertificateId(certificateId: string): Promise<CertificateRequest | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ certificateId });
  }

  static async findByStudentId(studentId: string): Promise<CertificateRequest[]> {
    const collection = await this.getCollection();
    return await collection.find({ studentId }).sort({ createdAt: -1 }).toArray();
  }

  static async findByStudentAndCourse(studentId: string, courseId: string): Promise<CertificateRequest | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ studentId, courseId });
  }

  static async findAll(): Promise<CertificateRequest[]> {
    const collection = await this.getCollection();
    return await collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  static async updateByCertificateId(certificateId: string, updates: CertificateUpdateInput): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.updateOne(
      { certificateId },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      }
    );

    return result.modifiedCount > 0;
  }
}