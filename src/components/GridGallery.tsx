import type { GridItem as GridItemType } from "@/types/grid";
import { GridItem } from "./GridItem";

interface GridGalleryProps {
  items: GridItemType[];
}

export function GridGallery({ items }: GridGalleryProps) {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <GridItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
