'use client';

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
    >
      Logout
    </button>
  );
}
