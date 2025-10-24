import { LiveProvider, LiveError, LivePreview } from 'react-live';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface PreviewProps {
  code: string;
}

const Preview = ({ code }: PreviewProps) => {
  const scope = {
    ...LucideIcons,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col glass rounded-2xl overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-border">
        <h2 className="font-semibold text-sm">Live Preview</h2>
      </div>

      <LiveProvider code={code} scope={scope} noInline={false}>
        <div className="flex-1 overflow-auto p-6 bg-preview-bg">
          <div className="min-h-full">
            <LivePreview className="w-full" />
          </div>
        </div>

        <LiveError className="border-t border-destructive/30 bg-destructive/10 px-4 py-3 text-sm code-font text-destructive flex items-start gap-2">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span className="flex-1" />
        </LiveError>
      </LiveProvider>
    </motion.div>
  );
};

export default Preview;
