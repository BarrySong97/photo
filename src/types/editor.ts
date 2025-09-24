export type EditorGridItemType = 'empty' | 'image' | 'text';

export interface EditorGridItem {
  id: string;
  type: EditorGridItemType;
  content?: string; // 图片URL或文字内容
}

export type BreakpointType = 'md' | 'lg' | 'xl';

export interface EditorState {
  md: EditorGridItem[][];  // MD断点的二维数组
  lg: EditorGridItem[][];  // LG断点的二维数组
  xl: EditorGridItem[][];  // XL断点的二维数组
}

// 每个断点的列数配置
export const BREAKPOINT_COLUMNS: Record<BreakpointType, number> = {
  md: 4,
  lg: 6,
  xl: 8,
};

// 初始行数
export const INITIAL_ROWS = 4;

// 生成空的GridItem
export function createEmptyGridItem(): EditorGridItem {
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'empty',
  };
}

// 初始化编辑器状态
export function initializeEditorState(): EditorState {
  const createGrid = (cols: number, rows: number) => {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => createEmptyGridItem())
    );
  };

  return {
    md: createGrid(BREAKPOINT_COLUMNS.md, INITIAL_ROWS),
    lg: createGrid(BREAKPOINT_COLUMNS.lg, INITIAL_ROWS),
    xl: createGrid(BREAKPOINT_COLUMNS.xl, INITIAL_ROWS),
  };
}