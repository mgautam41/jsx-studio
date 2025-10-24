import { Code, Copy, Check, X } from 'lucide-react';
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
    title: 'Framer Motion + Lucide',
    description: 'Full library import example',
    code: `import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, MessageCircle, Share2 } from "lucide-react";

function SocialCard() {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <motion.div
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="font-bold text-lg">Amazing Post</h3>
            <p className="text-sm text-gray-500">Just now</p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Check out this awesome React Component Runner! 🚀
          Built with Framer Motion for smooth animations.
        </p>

        <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            onClick={() => {
              setIsLiked(!isLiked);
              setLikes(isLiked ? likes - 1 : likes + 1);
            }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className="w-5 h-5"
              fill={isLiked ? "currentColor" : "none"}
            />
            <span className="font-semibold">{likes}</span>
          </motion.button>

          <motion.button
            onClick={() => setComments(comments + 1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">{comments}</span>
          </motion.button>

          <motion.button
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

render(<SocialCard />);`,
  },
  {
    title: 'State Hook Counter',
    description: 'Interactive counter with useState',
    code: `function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Count: {count}</h2>
        <div className="flex gap-2 justify-center">
          <button 
            onClick={() => setCount(count - 1)}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
          >
            Decrease
          </button>
          <button 
            onClick={() => setCount(0)}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-lg"
          >
            Reset
          </button>
          <button 
            onClick={() => setCount(count + 1)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-lg"
          >
            Increase
          </button>
        </div>
      </div>
    </div>
  );
}

render(<Counter />);`,
  },
  {
    title: 'Todo List',
    description: 'List rendering with state management',
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
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-full max-w-md space-y-3 p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">My Todo List</h2>
        {todos.map(todo => (
          <div 
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-md"
          >
            <span className={todo.done ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100 font-medium'}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>
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
        <span className="hidden sm:inline">Examples</span>
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
              className="absolute right-0 top-12 w-[90vw] sm:w-96 max-h-[600px] overflow-y-auto glass rounded-xl shadow-2xl border z-50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between mb-2 sticky top-0 bg-card z-10 pb-2">
                <h3 className="font-semibold">Code Examples</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {examples.map((example, index) => (
                <Card key={index} className="p-4 space-y-3 hover:border-primary/50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-sm">{example.title}</h4>
                    <p className="text-xs text-muted-foreground">{example.description}</p>
                  </div>
                  
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto code-font max-h-40 overflow-y-auto">
                    {example.code}
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
