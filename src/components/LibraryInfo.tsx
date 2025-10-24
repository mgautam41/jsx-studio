import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LIBRARY_INFO } from '@/utils/libraryRegistry';

const LibraryInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
        title="View supported libraries"
      >
        <Package className="h-4 w-4" />
        Libraries
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-12 w-96 max-h-[500px] overflow-y-auto glass rounded-xl shadow-2xl border z-50 p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Supported Libraries</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {LIBRARY_INFO.map((lib, idx) => (
                  <Card key={idx} className="p-4 space-y-2">
                    <div>
                      <h4 className="font-semibold text-sm">{lib.name}</h4>
                      <code className="text-xs text-muted-foreground code-font">
                        {lib.package}
                      </code>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {lib.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {lib.examples.map((example, i) => (
                        <code 
                          key={i}
                          className="px-2 py-1 bg-muted rounded text-xs code-font"
                        >
                          {example}
                        </code>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs">
                <p className="text-muted-foreground">
                  <strong>Note:</strong> All React hooks (useState, useEffect, etc.) are 
                  available without imports. Just use them directly in your code!
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LibraryInfo;
