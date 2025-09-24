import { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { 
  EditorState, 
  BreakpointType, 
  BREAKPOINT_COLUMNS, 
  initializeEditorState,
  createEmptyGridItem,
  type EditorGridItem 
} from "@/types/editor";
import { EditableGridCell } from "./EditableGridCell";
import { ContentModal } from "./ContentModal";
import { SwapModal } from "./SwapModal";

export function GridEditor() {
  const [editorState, setEditorState] = useState<EditorState>(initializeEditorState());
  const [activeTab, setActiveTab] = useState<BreakpointType>('md');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    editingId?: string;
    editingType?: 'image' | 'text';
    editingContent?: string;
  }>({ isOpen: false });
  
  const [swapModalState, setSwapModalState] = useState<{
    isOpen: boolean;
    sourceId?: string;
  }>({ isOpen: false });

  const getCurrentGrid = () => editorState[activeTab];
  const getColumnCount = () => BREAKPOINT_COLUMNS[activeTab];

  const updateGridItem = (rowIndex: number, colIndex: number, item: EditorGridItem) => {
    setEditorState(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((cell, cIdx) => (cIdx === colIndex ? item : cell))
          : row
      )
    }));
  };

  const findGridPosition = (id: string) => {
    const grid = getCurrentGrid();
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
        if (grid[rowIndex][colIndex].id === id) {
          return { rowIndex, colIndex };
        }
      }
    }
    return null;
  };

  const handleEdit = (id: string) => {
    const position = findGridPosition(id);
    if (!position) return;

    const item = getCurrentGrid()[position.rowIndex][position.colIndex];
    
    if (item.type === 'empty') {
      setModalState({
        isOpen: true,
        editingId: id,
      });
    } else {
      setModalState({
        isOpen: true,
        editingId: id,
        editingType: item.type as 'image' | 'text',
        editingContent: item.content,
      });
    }
  };

  const handleDelete = (id: string) => {
    const position = findGridPosition(id);
    if (!position) return;

    updateGridItem(position.rowIndex, position.colIndex, createEmptyGridItem());
  };

  const handleModalSave = (type: 'image' | 'text', content: string) => {
    if (!modalState.editingId) return;

    const position = findGridPosition(modalState.editingId);
    if (!position) return;

    updateGridItem(position.rowIndex, position.colIndex, {
      id: modalState.editingId,
      type,
      content,
    });

    setModalState({ isOpen: false });
  };

  const handleSwap = (id: string) => {
    setSwapModalState({
      isOpen: true,
      sourceId: id,
    });
  };

  const handleSwapConfirm = (targetId: string) => {
    if (!swapModalState.sourceId) return;

    const sourcePosition = findGridPosition(swapModalState.sourceId);
    const targetPosition = findGridPosition(targetId);
    
    if (!sourcePosition || !targetPosition) return;

    const sourceItem = getCurrentGrid()[sourcePosition.rowIndex][sourcePosition.colIndex];
    const targetItem = getCurrentGrid()[targetPosition.rowIndex][targetPosition.colIndex];

    // 交换两个格子的内容
    updateGridItem(sourcePosition.rowIndex, sourcePosition.colIndex, targetItem);
    updateGridItem(targetPosition.rowIndex, targetPosition.colIndex, sourceItem);

    setSwapModalState({ isOpen: false });
  };

  const addRow = () => {
    const cols = getColumnCount();
    const newRow = Array.from({ length: cols }, () => createEmptyGridItem());
    
    setEditorState(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newRow]
    }));
  };

  const exportData = () => {
    const grid = getCurrentGrid();
    const flatData = grid.flat().filter(item => item.type !== 'empty').map(item => ({
      id: item.id,
      ...(item.type === 'image' ? { imageUrl: item.content } : {}),
      ...(item.type === 'text' ? { text: item.content } : {}),
    }));
    
    console.log('导出数据:', flatData);
    // 可以添加复制到剪贴板或下载功能
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-3">Grid布局编辑器</h1>
        
        {/* 统计信息 */}
        <div className="bg-gray-100 rounded-lg p-3 mb-4 text-sm">
          <div className="flex gap-6">
            <span>当前断点: <strong>{activeTab.toUpperCase()}</strong></span>
            <span>列数: <strong>{getColumnCount()}</strong></span>
            <span>行数: <strong>{getCurrentGrid().length}</strong></span>
            <span>总格子: <strong>{getCurrentGrid().length * getColumnCount()}</strong></span>
            <span>已填充: <strong>{getCurrentGrid().flat().filter(item => item.type !== 'empty').length}</strong></span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <Tabs 
            selectedKey={activeTab} 
            onSelectionChange={(key) => setActiveTab(key as BreakpointType)}
            size="sm"
          >
            <Tab key="md" title="MD (4列)" />
            <Tab key="lg" title="LG (6列)" />
            <Tab key="xl" title="XL (8列)" />
          </Tabs>
          
          <div className="flex gap-2">
            <Button size="sm" color="secondary" variant="bordered" onPress={addRow}>
              添加行
            </Button>
            <Button size="sm" color="primary" onPress={exportData}>
              导出数据
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardBody className="p-4">
          <div className="space-y-2">
            {getCurrentGrid().map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-2">
                {/* 行号 */}
                <div className="w-6 h-6 bg-gray-200 rounded text-xs flex items-center justify-center font-medium text-gray-600 flex-shrink-0">
                  {rowIndex + 1}
                </div>
                
                {/* 该行的格子 */}
                <div 
                  className="grid gap-2 flex-1"
                  style={{
                    gridTemplateColumns: `repeat(${getColumnCount()}, 1fr)`,
                  }}
                >
                  {row.map((item) => (
                    <EditableGridCell
                      key={item.id}
                      item={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onSwap={item.type !== 'empty' ? handleSwap : undefined}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <ContentModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false })}
        onSave={handleModalSave}
        initialType={modalState.editingType}
        initialContent={modalState.editingContent}
      />

      <SwapModal
        isOpen={swapModalState.isOpen}
        onClose={() => setSwapModalState({ isOpen: false })}
        onConfirm={handleSwapConfirm}
        sourceId={swapModalState.sourceId || ''}
        allItems={getCurrentGrid().flat()}
        columns={getColumnCount()}
      />
    </div>
  );
}