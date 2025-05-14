import { Navigate, useLocation } from 'react-router';

// Mock authentication state
const useAuth = () => {
  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';
  
  // In a real app, this would be handled by a proper auth system
  const isAuthenticated = isBrowser ? localStorage.getItem('isAuthenticated') === 'true' : false;
  return {
    isAuthenticated,
    login: () => isBrowser && localStorage.setItem('isAuthenticated', 'true'),
    logout: () => isBrowser && localStorage.setItem('isAuthenticated', 'false'),
  };
};

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// Example Login component
export function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = () => {
    login();
    // Redirect back to the protected page
    window.location.href = from;
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login Required</h2>
      <p className="mb-4">You need to log in to access this page.</p>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Log In
      </button>
    </div>
  );
} 