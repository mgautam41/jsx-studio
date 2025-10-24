import { LiveProvider, LiveError, LivePreview } from 'react-live';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import * as React from 'react';
import { transformCode, validateCode } from '@/utils/codeTransformer';
import { buildLibraryScope } from '@/utils/libraryRegistry';

interface PreviewProps {
  code: string;
}

const Preview = ({ code }: PreviewProps) => {
  const [transformedCode, setTransformedCode] = React.useState('');
  const [validationError, setValidationError] = React.useState<string | null>(null);
  const [warnings, setWarnings] = React.useState<string[]>([]);

  React.useEffect(() => {
    const validation = validateCode(code);
    
    if (!validation.valid) {
      setValidationError(validation.error || 'Invalid code');
      setTransformedCode('');
      setWarnings(validation.warnings || []);
      return;
    }

    try {
      const transformed = transformCode(code);
      setTransformedCode(transformed);
      setValidationError(null);
      setWarnings(validation.warnings || []);
    } catch (error) {
      setValidationError('Failed to transform code: ' + (error as Error).message);
      setTransformedCode('');
      setWarnings([]);
    }
  }, [code]);

  // Build comprehensive scope with all supported libraries
  const scope = React.useMemo(() => buildLibraryScope(), []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col glass rounded-2xl overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-sm">Live Preview</h2>
        {!validationError && transformedCode && warnings.length === 0 && (
          <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
            <CheckCircle className="h-3.5 w-3.5" />
            <span>Ready</span>
          </div>
        )}
        {warnings.length > 0 && !validationError && (
          <div className="flex items-center gap-1.5 text-xs text-yellow-600 dark:text-yellow-400">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Warnings</span>
          </div>
        )}
      </div>

      {warnings.length > 0 && (
        <div className="px-4 py-2 bg-yellow-500/10 border-b border-yellow-500/30 text-xs">
          <div className="flex items-start gap-2 text-yellow-700 dark:text-yellow-400">
            <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              {warnings.map((warning, idx) => (
                <div key={idx}>{warning}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {validationError ? (
        <div className="flex-1 overflow-auto p-6 bg-preview-bg">
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-sm">
            <div className="flex items-start gap-2 text-destructive">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold mb-1">Validation Error</div>
                <div className="text-destructive/90">{validationError}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LiveProvider code={transformedCode} scope={scope} noInline={true}>
          <div className="flex-1 overflow-auto p-6 bg-preview-bg">
            <div className="min-h-full">
              <LivePreview className="w-full" />
            </div>
          </div>

          <LiveError className="border-t border-destructive/30 bg-destructive/10 px-4 py-3 text-sm code-font text-destructive flex items-start gap-2 max-h-32 overflow-auto">
            {(error) => error && (
              <>
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 whitespace-pre-wrap">{error}</div>
              </>
            )}
          </LiveError>
        </LiveProvider>
      )}
    </motion.div>
  );
};

export default Preview;
