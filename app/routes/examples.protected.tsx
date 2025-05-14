import { ProtectedRoute } from '~/components/ProtectedRoute';

export default function ProtectedExampleRoute() {
  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Protected Content</h2>
        <p>This is a protected page. You can only see this if you're authenticated!</p>
      </div>
    </ProtectedRoute>
  );
} 