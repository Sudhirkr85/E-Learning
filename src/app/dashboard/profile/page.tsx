'use client';

import { Container, Heading, Text, Card, Divider } from '@/components/ui';
import { useUser } from '@clerk/nextjs';
import { useUserSync } from '@/hooks/use-user-sync';

export default function ProfilePage() {
  const { user } = useUser();
  useUserSync();

  return (
    <Container className="py-8">
      <Heading level={1} className="mb-2 text-slate-50">
        Profile
      </Heading>
      <Text className="mb-8 text-slate-400">
        Manage your account information
      </Text>

      <div className="max-w-2xl">
        <Card className="border border-slate-800 bg-slate-900/80 p-8">
          <Heading level={3} className="mb-6 text-slate-50">
            Account Information
          </Heading>

          <div className="space-y-6">
            <div>
              <Text className="mb-2 text-slate-400">Full Name</Text>
              <Text className="text-slate-100 font-medium">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.fullName || 'Not set'}
              </Text>
            </div>

            <Divider className="border-slate-800" />

            <div>
              <Text className="mb-2 text-slate-400">Email Address</Text>
              <Text className="text-slate-100 font-medium">
                {user?.primaryEmailAddress?.emailAddress || 'Not set'}
              </Text>
            </div>

            <Divider className="border-slate-800" />

            <div>
              <Text className="mb-2 text-slate-400">Phone Number</Text>
              <Text className="text-slate-100 font-medium">
                {user?.primaryPhoneNumber?.phoneNumber || 'Not set'}
              </Text>
            </div>

            <Divider className="border-slate-800" />

            <div>
              <Text className="mb-2 text-slate-400">Account Created</Text>
              <Text className="text-slate-100 font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
              </Text>
            </div>
          </div>

          <Text className="mt-8 text-sm text-slate-500">
            To update your profile information, please visit your Clerk account settings.
          </Text>
        </Card>
      </div>
    </Container>
  );
}
