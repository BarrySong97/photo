import { useState } from "react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from "@heroui/modal";
import { Button } from "@heroui/button";
import type { EditorGridItem } from "@/types/editor";

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (targetId: string) => void;
  sourceId: string;
  allItems: EditorGridItem[];
  columns: number;
}

export function SwapModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  sourceId,
  allItems,
  columns
}: SwapModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 获取所有非空的格子（排除源格子）
  const availableItems = allItems.filter(item => 
    item.type !== 'empty' && item.id !== sourceId
  );

  const handleConfirm = () => {
    if (selectedId) {
      onConfirm(selectedId);
      setSelectedId(null);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedId(null);
    onClose();
  };

  const handleItemClick = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          选择要交换的格子
        </ModalHeader>
        <ModalBody>
          {availableItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              没有其他可交换的格子
            </div>
          ) : (
            <div 
              className="grid gap-2 max-h-96 overflow-y-auto p-2"
              style={{
                gridTemplateColumns: `repeat(${Math.min(columns, 6)}, 1fr)`,
              }}
            >
              {availableItems.map((item) => (
                <div
                  key={item.id}
                  className={`
                    aspect-[3/4] cursor-pointer rounded border-2 transition-all duration-200
                    ${selectedId === item.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.type === 'image' && item.content ? (
                    <img
                      src={item.content}
                      alt=""
                      className="w-full h-full object-cover rounded"
                    />
                  ) : item.type === 'text' && item.content ? (
                    <div className="w-full h-full bg-gray-50 rounded p-1 flex items-center justify-center">
                      <p className="text-xs text-center leading-tight overflow-hidden">
                        {item.content.length > 50 
                          ? item.content.slice(0, 50) + '...' 
                          : item.content
                        }
                      </p>
                    </div>
                  ) : null}
                  
                  {/* 选中标识 */}
                  {selectedId === item.id && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleClose}>
            取消
          </Button>
          <Button 
            color="primary" 
            onPress={handleConfirm}
            isDisabled={!selectedId}
          >
            确认交换
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}