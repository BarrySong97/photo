import { Provider } from "@/provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
  <Provider>
    <Outlet />
  </Provider>
);

export const Route = createRootRoute({ component: RootLayout });
