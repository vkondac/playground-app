import { Link, Outlet } from 'react-router';

export default function ExamplesLayout() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Playground App</h1>
      <div className="flex gap-4 mb-6">
      <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Home
        </Link>
        <Link
          to="/examples/todo"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Todo List
        </Link>
        <Link
          to="/examples/users/1"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          User Profile
        </Link>
        <Link
          to="/examples/protected"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Protected Route
        </Link>
        <Link
          to="/examples/planet/5"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Planet Details
        </Link>
        <Link
          to="/examples/doctor"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Doctor Map
        </Link>
      </div>
      <Outlet />
    </div>
  );
} 