import { useParams } from 'react-router';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Mock user data
const MOCK_USERS: Record<string, User> = {
  '1': { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  '2': { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  '3': { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
};

export function UserProfile() {
  const { userId } = useParams();
  const user = userId ? MOCK_USERS[userId] : null;

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-red-500">User Not Found</h2>
        <p>The requested user profile does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <div className="mt-1 text-lg">{user.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <div className="mt-1 text-lg">{user.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Role</label>
            <div className="mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 