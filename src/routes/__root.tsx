import { Provider } from "@/provider";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link className="[&.active]:font-bold" to="/">
        Home
      </Link>{" "}
    </div>
    <hr />
    <Provider>
      <Outlet />
    </Provider>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
