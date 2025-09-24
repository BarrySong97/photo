import { Button } from "@heroui/button";
import type { EditorGridItem } from "@/types/editor";

interface EditableGridCellProps {
  item: EditorGridItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSwap?: (id: string) => void;
}

export function EditableGridCell({ item, onEdit, onDelete, onSwap }: EditableGridCellProps) {
  if (item.type === 'empty') {
    return (
      <div className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-gray-400 transition-colors">
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-gray-600"
          onPress={() => onEdit(item.id)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Button>
      </div>
    );
  }

  if (item.type === 'image' && item.content) {
    return (
      <div className="aspect-[3/4] relative group rounded overflow-hidden">
        <img
          src={item.content}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="solid"
                color="primary"
                onPress={() => onEdit(item.id)}
                className="text-xs px-2 py-1 min-w-0 h-6"
              >
                编辑
              </Button>
              <Button
                size="sm"
                variant="solid"
                color="danger"
                onPress={() => onDelete(item.id)}
                className="text-xs px-2 py-1 min-w-0 h-6"
              >
                删除
              </Button>
            </div>
            {onSwap && (
              <Button
                size="sm"
                variant="solid"
                color="secondary"
                onPress={() => onSwap(item.id)}
                className="text-xs px-2 py-1 min-w-0 h-6"
              >
                交换
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (item.type === 'text' && item.content) {
    return (
      <div className="aspect-[3/4] bg-gray-50 rounded p-2 relative group hover:bg-gray-100 transition-colors">
        <p className="text-xs font-medium leading-relaxed overflow-hidden">{item.content}</p>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="solid"
                color="primary"
                onPress={() => onEdit(item.id)}
                className="text-xs px-2 py-1 min-w-0 h-6"
              >
                编辑
              </Button>
              <Button
                size="sm"
                variant="solid"
                color="danger"
                onPress={() => onDelete(item.id)}
                className="text-xs px-2 py-1 min-w-0 h-6"
              >
                删除
              </Button>
            </div>
            {onSwap && (
              <Button
                size="sm"
                variant="solid"
                color="secondary"
                onPress={() => onSwap(item.id)}
                className="text-xs px-2 py-1 min-w-0 h-6"
              >
                交换
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}