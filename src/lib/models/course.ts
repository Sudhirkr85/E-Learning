import { Db, ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';
import { Course } from '@/types';

export interface CourseDocument extends Omit<Course, 'id'> {
  _id?: ObjectId;
}

export class CourseModel {
  private static getCollection() {
    return getDatabase().then(db => db.collection<CourseDocument>('courses'));
  }

  /**
   * Create a new course
   */
  static async create(courseData: Omit<CourseDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    const collection = await this.getCollection();
    const now = new Date().toISOString();
    
    const course: CourseDocument = {
      ...courseData,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(course);
    
    return {
      ...course,
      id: result.insertedId.toString(),
    };
  }

  /**
   * Get all courses
   */
  static async findAll(): Promise<Course[]> {
    const collection = await this.getCollection();
    const courses = await collection
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    return courses.map(doc => ({
      ...doc,
      id: doc._id?.toString() || '',
    }));
  }

  /**
   * Get course by slug
   */
  static async findBySlug(slug: string): Promise<Course | null> {
    const collection = await this.getCollection();
    const course = await collection.findOne({ slug });

    if (!course) return null;

    return {
      ...course,
      id: course._id?.toString() || '',
    };
  }

  /**
   * Get course by ID
   */
  static async findById(id: string): Promise<Course | null> {
    try {
      const collection = await this.getCollection();
      const objectId = new ObjectId(id);
      const course = await collection.findOne({ _id: objectId });

      if (!course) return null;

      return {
        ...course,
        id: course._id?.toString() || '',
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Get featured course
   */
  static async findFeatured(): Promise<Course | null> {
    const collection = await this.getCollection();
    const course = await collection.findOne({ 
      featured: true,
      status: 'published'
    });

    if (!course) return null;

    return {
      ...course,
      id: course._id?.toString() || '',
    };
  }

  /**
   * Get all published courses
   */
  static async findPublished(): Promise<Course[]> {
    const collection = await this.getCollection();
    const courses = await collection
      .find({ status: 'published' })
      .sort({ updatedAt: -1 })
      .toArray();

    return courses.map(doc => ({
      ...doc,
      id: doc._id?.toString() || '',
    }));
  }

  /**
   * Get all coming soon courses
   */
  static async findComingSoon(): Promise<Course[]> {
    const collection = await this.getCollection();
    const courses = await collection
      .find({ status: 'coming-soon' })
      .sort({ updatedAt: -1 })
      .toArray();

    return courses.map(doc => ({
      ...doc,
      id: doc._id?.toString() || '',
    }));
  }

  /**
   * Update course by ID
   */
  static async updateById(id: string, updateData: Partial<CourseDocument>): Promise<Course | null> {
    try {
      const collection = await this.getCollection();
      const objectId = new ObjectId(id);

      const result = await collection.findOneAndUpdate(
        { _id: objectId },
        {
          $set: {
            ...updateData,
            updatedAt: new Date().toISOString(),
          },
        },
        { returnDocument: 'after' }
      );

      if (!result) return null;

      return {
        ...result,
        id: result._id?.toString() || '',
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Delete course by ID
   */
  static async deleteById(id: string): Promise<boolean> {
    try {
      const collection = await this.getCollection();
      const objectId = new ObjectId(id);

      const result = await collection.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Search courses by title or description
   */
  static async search(query: string): Promise<Course[]> {
    const collection = await this.getCollection();
    const courses = await collection
      .find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } },
        ],
      })
      .sort({ updatedAt: -1 })
      .toArray();

    return courses.map(doc => ({
      ...doc,
      id: doc._id?.toString() || '',
    }));
  }

  /**
   * Get courses by category
   */
  static async findByCategory(category: string): Promise<Course[]> {
    const collection = await this.getCollection();
    const courses = await collection
      .find({ 
        category,
        status: 'published'
      })
      .sort({ updatedAt: -1 })
      .toArray();

    return courses.map(doc => ({
      ...doc,
      id: doc._id?.toString() || '',
    }));
  }

  /**
   * Count total courses
   */
  static async count(): Promise<number> {
    const collection = await this.getCollection();
    return await collection.countDocuments();
  }
}
