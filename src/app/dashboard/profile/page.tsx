'use client';

import { useState } from 'react';
import { Container, Heading, Text, Card, Divider, Button, Input } from '@/components/ui';
import { useUser } from '@clerk/nextjs';
import { useUserSync } from '@/hooks/use-user-sync';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.primaryPhoneNumber?.phoneNumber || '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useUserSync();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setErrorMessage('');
      setSuccessMessage('');

      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to update profile');
        return;
      }

      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.primaryPhoneNumber?.phoneNumber || '',
    });
    setIsEditing(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  if (!isLoaded) {
    return (
      <Container className="py-8">
        <Text className="text-slate-400">Loading...</Text>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Heading level={1} className="mb-2 text-slate-50">
        Profile
      </Heading>
      <Text className="mb-8 text-slate-400">
        Manage your account information
      </Text>

      {successMessage && (
        <div className="mb-6 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-emerald-300">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-red-300">
          {errorMessage}
        </div>
      )}

      <div className="max-w-2xl">
        <Card className="border border-slate-800 bg-slate-900/80 p-8">
          <div className="flex items-center justify-between mb-6">
            <Heading level={3} className="text-slate-50">
              Account Information
            </Heading>
            {!isEditing && (
              <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div>
                <Text className="mb-2 text-slate-400">First Name</Text>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950/50 border border-slate-700 text-slate-100 px-4 py-2 rounded-lg focus:outline-none focus:border-cyan-400"
                  placeholder="First name"
                />
              </div>

              <div>
                <Text className="mb-2 text-slate-400">Last Name</Text>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950/50 border border-slate-700 text-slate-100 px-4 py-2 rounded-lg focus:outline-none focus:border-cyan-400"
                  placeholder="Last name"
                />
              </div>

              <div>
                <Text className="mb-2 text-slate-400">Mobile Number</Text>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950/50 border border-slate-700 text-slate-100 px-4 py-2 rounded-lg focus:outline-none focus:border-cyan-400"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <Text className="mb-2 text-slate-400">Email Address</Text>
                <Text className="text-slate-100 font-medium bg-slate-950/50 border border-slate-700 px-4 py-2 rounded-lg">
                  {user?.primaryEmailAddress?.emailAddress || 'Not set'}
                </Text>
                <Text size="sm" className="mt-2 text-slate-500">
                  Email cannot be changed. Contact support if needed.
                </Text>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="primary" onClick={handleSave} disabled={isSaving} className="flex-1">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outline" onClick={handleCancel} disabled={isSaving} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
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
          )}
        </Card>
      </div>
    </Container>
  );
}
