import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Welcome />
      <p className="mb-4">test</p>
      <Link
        to="/examples"
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Examples
      </Link>
    </div>
  );
}
