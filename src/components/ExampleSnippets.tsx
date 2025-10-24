import { Code, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Example {
  title: string;
  description: string;
  code: string;
}

const examples: Example[] = [
  {
    title: 'Simple Component',
    description: 'Basic component with export default',
    code: `function Car() {
  return <h2>Hi, I am a Car!</h2>;
}

export default Car;`,
  },
  {
    title: 'Props Example',
    description: 'Component with props and createRoot',
    code: `function Car(props) {
  return <h2>I am a {props.brand}!</h2>;
}

function Garage() {
  return (
    <>
      <h1>Who lives in my Garage?</h1>
      <Car brand="Ford" />
      <Car brand="BMW" />
      <Car brand="Tesla" />
    </>
  );
}

createRoot(document.getElementById('root')).render(<Garage />);`,
  },
  {
    title: 'State Hook',
    description: 'Interactive counter with useState',
    code: `function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold">Count: {count}</h2>
      <div className="flex gap-2 justify-center">
        <button 
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrease
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Increase
        </button>
      </div>
    </div>
  );
}

render(<Counter />);`,
  },
  {
    title: 'List Rendering',
    description: 'Map through array to render list',
    code: `function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build Projects', done: false },
    { id: 3, text: 'Master Components', done: false }
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  return (
    <div className="max-w-md mx-auto space-y-3">
      <h2 className="text-2xl font-bold mb-4">My Todo List</h2>
      {todos.map(todo => (
        <div 
          key={todo.id}
          onClick={() => toggleTodo(todo.id)}
          className="p-3 bg-gray-100 dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <span className={todo.done ? 'line-through text-gray-500' : ''}>
            {todo.text}
          </span>
        </div>
      ))}
    </div>
  );
}

render(<TodoList />);`,
  },
];

interface ExampleSnippetsProps {
  onSelectExample: (code: string) => void;
}

const ExampleSnippets = ({ onSelectExample }: ExampleSnippetsProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <Code className="h-4 w-4" />
        Examples
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
              className="absolute right-0 top-12 w-96 max-h-[600px] overflow-y-auto glass rounded-xl shadow-2xl border z-50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Code Examples</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </div>

              {examples.map((example, index) => (
                <Card key={index} className="p-4 space-y-3 hover:border-primary/50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-sm">{example.title}</h4>
                    <p className="text-xs text-muted-foreground">{example.description}</p>
                  </div>
                  
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto code-font">
                    {example.code.split('\n').slice(0, 5).join('\n')}
                    {example.code.split('\n').length > 5 && '\n...'}
                  </pre>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        onSelectExample(example.code);
                        setIsOpen(false);
                      }}
                      className="flex-1"
                    >
                      Load Example
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(example.code, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExampleSnippets;
