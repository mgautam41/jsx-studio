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
  const scope = React.useMemo(() => {
    const builtScope = buildLibraryScope();
    console.log('Available scope:', Object.keys(builtScope).slice(0, 20)); // Debug log
    return builtScope;
  }, []);

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
        <div className="px-4 py-2 bg-yellow-500/10 border-b border-yellow-500/30">
          <div className="flex items-start gap-2 text-xs">
            <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
            <div className="flex-1 text-yellow-700 dark:text-yellow-300">
              <div className="font-semibold mb-1">Warnings:</div>
              {warnings.map((warning, idx) => (
                <div key={idx} className="text-yellow-600 dark:text-yellow-400">{warning}</div>
              ))}
              <div className="mt-1 text-yellow-600 dark:text-yellow-400">
                Note: Your code will still run with available libraries. Check the Libraries button for supported packages.
              </div>
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

          <LiveError className="border-t border-destructive/30 bg-destructive/10 px-4 py-3 text-sm code-font text-destructive max-h-32 overflow-auto">
            {(error: any) => {
              if (!error) return null;
              
              const errorStr = String(error);
              console.error('Runtime error:', errorStr); // Debug log
              
              return (
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Runtime Error:</div>
                    <div className="whitespace-pre-wrap text-xs">{errorStr}</div>
                    {errorStr.includes('is not defined') && (
                      <div className="mt-2 text-xs text-destructive/80">
                        💡 Tip: Make sure all imports are from supported libraries. 
                        Click "Libraries" button to see what's available.
                      </div>
                    )}
                  </div>
                </div>
              );
            }}
          </LiveError>
        </LiveProvider>
      )}
    </motion.div>
  );
};

export default Preview;
