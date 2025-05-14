import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("examples", "routes/examples.tsx", [
    route("todo", "routes/examples.todo.tsx"),
    route("users/:userId", "routes/examples.users.$userId.tsx"),
    route("protected", "routes/examples.protected.tsx"),
    route("planet/:id", "routes/examples.planet.$id.tsx"),
    route("doctor", "routes/examples.doctor.tsx")
  ]),
  route("login", "routes/login.tsx")
] satisfies RouteConfig;
