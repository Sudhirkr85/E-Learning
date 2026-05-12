import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { UserModel } from '@/lib/models/user';

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Sync user with MongoDB
    const syncedUser = await UserModel.syncUserWithClerk({
      id: user.id,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
      emailAddress: user.primaryEmailAddress?.emailAddress,
      imageUrl: user.imageUrl,
    });

    return NextResponse.json({
      success: true,
      user: syncedUser,
    });

  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    );
  }
}
