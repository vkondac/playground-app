import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="container flex justify-center items-center">
      <div className="flex-col justify-center items-center space-y-10 p-100">
        <p>Welcome to playground app for testing maps and new react hooks</p>
        <Link
          to="/examples"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 max-w-32"
        >
          View Examples
        </Link>
      </div>
    </div>
  );
}
