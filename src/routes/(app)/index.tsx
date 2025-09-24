import { createFileRoute } from "@tanstack/react-router";
import { GridGallery } from "@/components/GridGallery";
import { gridItems } from "@/data/mockData";

export const Route = createFileRoute("/(app)/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-white">
      <div className=" px-8">
        <GridGallery items={gridItems} />
      </div>
    </div>
  );
}
