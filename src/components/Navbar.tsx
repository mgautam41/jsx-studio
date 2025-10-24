import { Moon, Sun, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import ExampleSnippets from './ExampleSnippets';

interface NavbarProps {
  onRun: () => void;
  onReset: () => void;
  autoRun: boolean;
  onAutoRunToggle: () => void;
  onLoadExample: (code: string) => void;
}

const Navbar = ({ onRun, onReset, autoRun, onAutoRunToggle, onLoadExample }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass sticky top-0 z-50 border-b"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center"
          >
            <span className="text-primary-foreground font-bold text-lg">R</span>
          </motion.div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            React Runner
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <ExampleSnippets onSelectExample={onLoadExample} />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onAutoRunToggle}
            className="hidden md:flex"
          >
            Auto: {autoRun ? 'ON' : 'OFF'}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            title="Reset Code"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            onClick={onRun}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            <Play className="h-4 w-4 mr-2" />
            Run
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative overflow-hidden"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </motion.div>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
