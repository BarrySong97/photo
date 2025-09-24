import { useState } from "react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (type: 'image' | 'text', content: string) => void;
  initialType?: 'image' | 'text';
  initialContent?: string;
}

export function ContentModal({ 
  isOpen, 
  onClose, 
  onSave,
  initialType,
  initialContent = ''
}: ContentModalProps) {
  const [contentType, setContentType] = useState<'image' | 'text'>(initialType || 'image');
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    if (!content.trim()) return;
    onSave(contentType, content.trim());
    onClose();
    setContent('');
  };

  const handleClose = () => {
    onClose();
    setContent(initialContent);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {initialType ? '编辑内容' : '添加内容'}
        </ModalHeader>
        <ModalBody>
          {!initialType && (
            <div className="flex gap-4 mb-4">
              <Button
                variant={contentType === 'image' ? 'solid' : 'bordered'}
                color={contentType === 'image' ? 'primary' : 'default'}
                onPress={() => setContentType('image')}
                className="flex-1"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                图片
              </Button>
              <Button
                variant={contentType === 'text' ? 'solid' : 'bordered'}
                color={contentType === 'text' ? 'primary' : 'default'}
                onPress={() => setContentType('text')}
                className="flex-1"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                文字
              </Button>
            </div>
          )}
          
          {contentType === 'image' ? (
            <Input
              label="图片URL"
              placeholder="请输入图片链接"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              variant="bordered"
              className="w-full"
            />
          ) : (
            <Textarea
              label="文字内容"
              placeholder="请输入要显示的文字"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              variant="bordered"
              className="w-full"
              minRows={3}
              maxRows={6}
            />
          )}

          {contentType === 'image' && content && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">预览：</p>
              <div className="aspect-[3/4] w-32 overflow-hidden rounded-lg border">
                <img
                  src={content}
                  alt="预览"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDNIMy45OTk4OUM0LjI3NjA3IDMgNC41NTIyNSAzLjExMDc3IDQuNzY3NyAzLjMzMTgyTDE5IDE3LjU3OTJWOUgxN1Y3LjQxNDJMNS40MTQyNSAzSDE5VjNIMjFWM1oiIGZpbGw9IiNEMUQxRDEiLz4KPC9zdmc+';
                  }}
                />
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleClose}>
            取消
          </Button>
          <Button 
            color="primary" 
            onPress={handleSave}
            isDisabled={!content.trim()}
          >
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}