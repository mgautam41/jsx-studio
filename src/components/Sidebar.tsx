import { Moon, Sun, Play, RotateCcw, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ExampleSnippets from './ExampleSnippets';
import LibraryInfo from './LibraryInfo';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  onRun: () => void;
  onReset: () => void;
  autoRun: boolean;
  onAutoRunToggle: () => void;
  onLoadExample: (code: string) => void;
}

const Sidebar = ({ onRun, onReset, autoRun, onAutoRunToggle, onLoadExample }: SidebarProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  return (
    <>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border shadow-sm"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            // variants={sidebarVariants}
            className="fixed left-0 top-0 h-full w-80 bg-background/95 backdrop-blur-sm border-r shadow-lg z-50 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center"
                >
                  <span className="text-primary-foreground font-bold text-lg">R</span>
                </motion.div>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  React Runner
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 p-4 space-y-4">
              {/* Primary Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Actions
                </h3>
                
                <Button
                  onClick={() => {
                    onRun();
                    if (isMobile) toggleSidebar();
                  }}
                  className="w-full bg-primary hover:bg-primary/90 justify-start"
                >
                  <Play className="h-4 w-4 mr-3" />
                  Run Code
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    onReset();
                    if (isMobile) toggleSidebar();
                  }}
                  className="w-full justify-start"
                >
                  <RotateCcw className="h-4 w-4 mr-3" />
                  Reset Code
                </Button>
              </div>

              {/* Settings */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Settings
                </h3>
                
                <Button
                  variant="outline"
                  onClick={onAutoRunToggle}
                  className="w-full justify-start"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Auto Run</span>
                    <span className={`text-xs px-2 py-1 rounded ${autoRun ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}>
                      {autoRun ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={toggleTheme}
                  className="w-full justify-start"
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                    className="mr-3"
                  >
                    {theme === 'dark' ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <Sun className="h-4 w-4" />
                    )}
                  </motion.div>
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </Button>
              </div>

              {/* Resources */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Resources
                </h3>
                
                <div className="space-y-2">
                  <ExampleSnippets 
                    onSelectExample={(code) => {
                      onLoadExample(code);
                      if (isMobile) toggleSidebar();
                    }} 
                  />
                  <LibraryInfo />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;