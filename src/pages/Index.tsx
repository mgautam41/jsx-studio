import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CodeEditor from '@/components/CodeEditor';
import Preview from '@/components/Preview';
import { ThemeProvider } from '@/contexts/ThemeContext';

const DEFAULT_CODE = `function Component() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          React Component Runner
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Start building amazing components!
        </p>
      </div>
      
      <div className="flex flex-col items-center gap-3">
        <div className="text-6xl font-bold text-blue-500">{count}</div>
        <button
          onClick={() => setCount(count + 1)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-lg hover:shadow-xl"
        >
          Increment Counter
        </button>
      </div>
    </div>
  );
}

render(<Component />);`;

const Index = () => {
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem('react-runner-code');
    return saved || DEFAULT_CODE;
  });
  const [previewCode, setPreviewCode] = useState(code);
  const [autoRun, setAutoRun] = useState(false);

  useEffect(() => {
    localStorage.setItem('react-runner-code', code);
    
    if (autoRun) {
      const timer = setTimeout(() => {
        setPreviewCode(code);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [code, autoRun]);

  const handleRun = () => {
    setPreviewCode(code);
  };

  const handleReset = () => {
    setCode(DEFAULT_CODE);
    setPreviewCode(DEFAULT_CODE);
    localStorage.removeItem('react-runner-code');
  };

  const handleAutoRunToggle = () => {
    setAutoRun(!autoRun);
  };

  const handleLoadExample = (exampleCode: string) => {
    setCode(exampleCode);
    setPreviewCode(exampleCode);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar 
          onRun={handleRun} 
          onReset={handleReset}
          autoRun={autoRun}
          onAutoRunToggle={handleAutoRunToggle}
          onLoadExample={handleLoadExample}
        />
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
            <CodeEditor code={code} onChange={setCode} />
            <Preview code={previewCode} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
