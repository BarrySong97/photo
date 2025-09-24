import { createFileRoute } from "@tanstack/react-router";
import { GridEditor } from "@/components/GridEditor";

export const Route = createFileRoute("/(admin)/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <GridEditor />
    </div>
  );
}
