'use client';

import { Container, Heading, Text, Card, Divider } from '@/components/ui';
import { useUserSync } from '@/hooks/use-user-sync';

export default function SettingsPage() {
  useUserSync();

  return (
    <Container className="py-8">
      <Heading level={1} className="mb-2 text-slate-50">
        Settings
      </Heading>
      <Text className="mb-8 text-slate-400">
        Manage your preferences and account settings
      </Text>

      <div className="max-w-2xl space-y-6">
        <Card className="border border-slate-800 bg-slate-900/80 p-8">
          <Heading level={3} className="mb-4 text-slate-50">
            Notifications
          </Heading>
          <Text className="text-slate-400 mb-4">
            Email notification preferences coming soon
          </Text>
        </Card>

        <Card className="border border-slate-800 bg-slate-900/80 p-8">
          <Heading level={3} className="mb-4 text-slate-50">
            Learning Preferences
          </Heading>
          <Text className="text-slate-400 mb-4">
            Customize your learning experience preferences coming soon
          </Text>
        </Card>

        <Card className="border border-slate-800 bg-slate-900/80 p-8">
          <Heading level={3} className="mb-4 text-slate-50">
            Privacy & Security
          </Heading>
          <Text className="text-slate-400">
            Your data and security settings are managed through your Clerk account.
          </Text>
        </Card>
      </div>
    </Container>
  );
}
