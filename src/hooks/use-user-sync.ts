'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export function useUserSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      // Sync user with MongoDB via API
      const syncUser = async () => {
        try {
          await fetch('/api/user/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error syncing user with MongoDB:', error);
        }
      };

      syncUser();
    }
  }, [user, isLoaded]);

  return { user, isLoaded };
}
