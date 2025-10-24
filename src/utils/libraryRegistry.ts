import * as FramerMotion from 'framer-motion';
import * as LucideReact from 'lucide-react';
import * as ReactIcons from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import * as Headless from '@headlessui/react';
import * as React from 'react';

/**
 * Registry of supported libraries with their imports
 */
export const SUPPORTED_LIBRARIES: Record<string, any> = {
  // React core
  'react': React,
  
  // Animation
  'framer-motion': FramerMotion,
  
  // Icons
  'lucide-react': LucideReact,
  'react-icons': ReactIcons,
  'react-icons/fa': FaIcons,
  'react-icons/ai': AiIcons,
  'react-icons/bi': BiIcons,
  'react-icons/bs': BsIcons,
  'react-icons/hi': HiIcons,
  'react-icons/md': MdIcons,
  
  // UI Components
  '@headlessui/react': Headless,
};

/**
 * Popular library aliases for better user experience
 */
export const LIBRARY_ALIASES: Record<string, string[]> = {
  'framer-motion': ['motion', 'AnimatePresence', 'useAnimation', 'useMotionValue'],
  'lucide-react': ['Sparkles', 'Heart', 'MessageCircle', 'Share2', 'Star', 'Menu', 'X', 'Search'],
  'react-icons/fa': ['FaReact', 'FaHeart', 'FaStar', 'FaUser'],
  'react-icons/ai': ['AiFillHeart', 'AiOutlineHeart', 'AiFillStar'],
  'react-icons/bi': ['BiHeart', 'BiStar', 'BiUser'],
  'react-icons/bs': ['BsHeart', 'BsStar', 'BsSearch'],
  'react-icons/hi': ['HiHeart', 'HiStar', 'HiMenu'],
  'react-icons/md': ['MdFavorite', 'MdStar', 'MdMenu'],
  '@headlessui/react': ['Dialog', 'Menu', 'Transition', 'Popover', 'Switch'],
};

/**
 * Get library information for display
 */
export const LIBRARY_INFO: Array<{
  name: string;
  package: string;
  description: string;
  examples: string[];
}> = [
  {
    name: 'Framer Motion',
    package: 'framer-motion',
    description: 'Animation library for React',
    examples: ['motion', 'AnimatePresence', 'useAnimation'],
  },
  {
    name: 'Lucide React',
    package: 'lucide-react',
    description: 'Beautiful icon library',
    examples: ['Heart', 'Star', 'Menu', 'Search'],
  },
  {
    name: 'React Icons',
    package: 'react-icons/*',
    description: 'Popular icon sets (FA, AI, BI, BS, HI, MD)',
    examples: ['FaHeart', 'AiFillStar', 'BsSearch'],
  },
  {
    name: 'Headless UI',
    package: '@headlessui/react',
    description: 'Unstyled accessible UI components',
    examples: ['Dialog', 'Menu', 'Transition'],
  },
];

/**
 * Parse imports from code and extract library names
 */
export const parseImports = (code: string): Array<{ library: string; imports: string[] }> => {
  const importRegex = /import\s+(?:{([^}]+)}|(\w+)|\*\s+as\s+(\w+))\s+from\s+['"]([^'"]+)['"]/g;
  const imports: Array<{ library: string; imports: string[] }> = [];
  
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const [, namedImports, defaultImport, namespaceImport, library] = match;
    
    const importNames: string[] = [];
    if (namedImports) {
      importNames.push(...namedImports.split(',').map(i => i.trim()));
    }
    if (defaultImport) {
      importNames.push(defaultImport);
    }
    if (namespaceImport) {
      importNames.push(namespaceImport);
    }
    
    imports.push({ library, imports: importNames });
  }
  
  return imports;
};

/**
 * Build scope object with all supported libraries
 */
export const buildLibraryScope = (): Record<string, any> => {
  const scope: Record<string, any> = {
    // React hooks directly available
    React,
    useState: React.useState,
    useEffect: React.useEffect,
    useRef: React.useRef,
    useMemo: React.useMemo,
    useCallback: React.useCallback,
    useContext: React.useContext,
    useReducer: React.useReducer,
  };

  // Add all supported libraries
  Object.entries(SUPPORTED_LIBRARIES).forEach(([key, lib]) => {
    // Add library as a whole
    const libName = key.split('/').pop() || key;
    scope[libName] = lib;
    
    // Spread named exports for easier access
    if (typeof lib === 'object') {
      Object.entries(lib).forEach(([exportName, exportValue]) => {
        // Only add if not already in scope
        if (!scope[exportName]) {
          scope[exportName] = exportValue;
        }
      });
    }
  });

  return scope;
};

/**
 * Check if library is supported
 */
export const isLibrarySupported = (libraryName: string): boolean => {
  return libraryName in SUPPORTED_LIBRARIES || libraryName === 'react';
};

/**
 * Get unsupported libraries from code
 */
export const getUnsupportedLibraries = (code: string): string[] => {
  const imports = parseImports(code);
  return imports
    .filter(imp => !isLibrarySupported(imp.library))
    .map(imp => imp.library);
};
