import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminUser } from '@/types';

const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('Admin credentials not configured in environment variables');
    return false;
  }

  return email === adminEmail && password === adminPassword;
}

export async function createAdminSession(): Promise<void> {
  const sessionData = {
    authenticated: true,
    timestamp: Date.now(),
  };

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  });
}

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE);

    if (!sessionCookie) {
      return false;
    }

    const sessionData = JSON.parse(sessionCookie.value);
    
    // Check if session is expired
    if (Date.now() - sessionData.timestamp > SESSION_DURATION) {
      await clearAdminSession();
      return false;
    }

    return sessionData.authenticated === true;
  } catch (error) {
    console.error('Error verifying admin session:', error);
    return false;
  }
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function requireAdminAuth(): Promise<void> {
  const isAuthenticated = await verifyAdminSession();
  
  if (!isAuthenticated) {
    redirect('/admin/login');
  }
}

export async function handleAdminLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const isValid = await verifyAdminCredentials(email, password);
    
    if (isValid) {
      await createAdminSession();
      return { success: true };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return { success: false, error: 'An error occurred during login' };
  }
}

export async function handleAdminLogout(): Promise<void> {
  await clearAdminSession();
}
