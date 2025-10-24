import * as FramerMotion from 'framer-motion';
import * as LucideReact from 'lucide-react';
import * as ReactIcons from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as HiIcons from 'react-icons/hi';
import * as Hi2Icons from 'react-icons/hi2';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io5';
import * as RiIcons from 'react-icons/ri';
import * as Headless from '@headlessui/react';
import * as React from 'react';
import clsx from 'clsx';
import classNames from 'classnames';
import * as dateFns from 'date-fns';
import axios from 'axios';
import { create } from 'zustand';

/**
 * Comprehensive registry of supported libraries
 */
export const SUPPORTED_LIBRARIES: Record<string, any> = {
  // React core
  'react': React,
  'react-dom': React,
  'react/jsx-runtime': React,
  
  // Animation
  'framer-motion': FramerMotion,
  
  // Icons - Lucide
  'lucide-react': LucideReact,
  
  // Icons - React Icons (all packs)
  'react-icons': ReactIcons,
  'react-icons/fa': FaIcons,
  'react-icons/fa6': Fa6Icons,
  'react-icons/ai': AiIcons,
  'react-icons/bi': BiIcons,
  'react-icons/bs': BsIcons,
  'react-icons/hi': HiIcons,
  'react-icons/hi2': Hi2Icons,
  'react-icons/md': MdIcons,
  'react-icons/io': IoIcons,
  'react-icons/io5': IoIcons,
  'react-icons/ri': RiIcons,
  
  // UI Components
  '@headlessui/react': Headless,
  
  // Utilities
  'clsx': { default: clsx, clsx },
  'classnames': { default: classNames, classNames },
  
  // Date/Time
  'date-fns': dateFns,
  
  // HTTP
  'axios': { default: axios, axios },
  
  // State Management
  'zustand': { create },
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
    description: 'Production-ready animation library',
    examples: ['motion.div', 'AnimatePresence', 'useAnimation', 'useMotionValue'],
  },
  {
    name: 'Lucide React',
    package: 'lucide-react',
    description: 'Beautiful & consistent icon library',
    examples: ['Heart', 'Star', 'Menu', 'Search', 'Sparkles', 'MessageCircle'],
  },
  {
    name: 'React Icons',
    package: 'react-icons/*',
    description: 'Popular icon collections (Font Awesome, Material, etc)',
    examples: ['FaHeart (fa)', 'AiFillStar (ai)', 'BsSearch (bs)', 'IoMdHeart (io5)'],
  },
  {
    name: 'Headless UI',
    package: '@headlessui/react',
    description: 'Unstyled, accessible UI components',
    examples: ['Dialog', 'Menu', 'Transition', 'Popover', 'Switch', 'Listbox'],
  },
  {
    name: 'Class Utilities',
    package: 'clsx / classnames',
    description: 'Conditional className utility',
    examples: ['clsx()', 'classNames()'],
  },
  {
    name: 'Date-fns',
    package: 'date-fns',
    description: 'Modern JavaScript date utility library',
    examples: ['format', 'addDays', 'isAfter', 'differenceInDays'],
  },
  {
    name: 'Axios',
    package: 'axios',
    description: 'Promise-based HTTP client',
    examples: ['axios.get()', 'axios.post()'],
  },
  {
    name: 'Zustand',
    package: 'zustand',
    description: 'Lightweight state management',
    examples: ['create()'],
  },
];

/**
 * Parse imports from code
 */
export const parseImports = (code: string): Array<{ library: string; imports: string[] }> => {
  const importRegex = /import\s+(?:(?:{([^}]+)})|(?:(\w+)(?:\s*,\s*{([^}]+)})?)|(?:\*\s+as\s+(\w+)))\s+from\s+['"]([^'"]+)['"]/g;
  const imports: Array<{ library: string; imports: string[] }> = [];
  
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const [, namedImports, defaultImport, additionalNamed, namespaceImport, library] = match;
    
    const importNames: string[] = [];
    
    if (defaultImport) {
      importNames.push(defaultImport);
    }
    
    if (namedImports) {
      importNames.push(...namedImports.split(',').map(i => i.trim()));
    }
    
    if (additionalNamed) {
      importNames.push(...additionalNamed.split(',').map(i => i.trim()));
    }
    
    if (namespaceImport) {
      importNames.push(namespaceImport);
    }
    
    imports.push({ library, imports: importNames });
  }
  
  return imports;
};

/**
 * Build comprehensive scope with all supported libraries
 */
export const buildLibraryScope = (): Record<string, any> => {
  const scope: Record<string, any> = {
    // React core - make everything easily accessible
    React,
    useState: React.useState,
    useEffect: React.useEffect,
    useRef: React.useRef,
    useMemo: React.useMemo,
    useCallback: React.useCallback,
    useContext: React.useContext,
    useReducer: React.useReducer,
    useLayoutEffect: React.useLayoutEffect,
    useImperativeHandle: React.useImperativeHandle,
    createContext: React.createContext,
    forwardRef: React.forwardRef,
    memo: React.memo,
    lazy: React.lazy,
    Suspense: React.Suspense,
    Fragment: React.Fragment,
    
    // Utilities
    clsx,
    classNames,
    axios,
    create, // zustand
  };

  // Add all Framer Motion exports
  Object.entries(FramerMotion).forEach(([key, value]) => {
    scope[key] = value;
  });

  // Add all Lucide React icons
  Object.entries(LucideReact).forEach(([key, value]) => {
    scope[key] = value;
  });

  // Add React Icons - all packs
  const iconPacks = [
    FaIcons, Fa6Icons, AiIcons, BiIcons, BsIcons, 
    HiIcons, Hi2Icons, MdIcons, IoIcons, RiIcons
  ];
  
  iconPacks.forEach(pack => {
    Object.entries(pack).forEach(([key, value]) => {
      if (!scope[key]) { // Avoid conflicts
        scope[key] = value;
      }
    });
  });

  // Add Headless UI
  Object.entries(Headless).forEach(([key, value]) => {
    if (!scope[key]) {
      scope[key] = value;
    }
  });

  // Add date-fns
  Object.entries(dateFns).forEach(([key, value]) => {
    if (!scope[key]) {
      scope[key] = value;
    }
  });

  return scope;
};

/**
 * Check if library is supported
 */
export const isLibrarySupported = (libraryName: string): boolean => {
  // Check direct match
  if (libraryName in SUPPORTED_LIBRARIES || libraryName === 'react') {
    return true;
  }
  
  // Check if it's a react-icons sub-package
  if (libraryName.startsWith('react-icons/')) {
    return true;
  }
  
  return false;
};

/**
 * Get unsupported libraries from code
 */
export const getUnsupportedLibraries = (code: string): string[] => {
  const imports = parseImports(code);
  const unsupported = imports
    .filter(imp => !isLibrarySupported(imp.library))
    .map(imp => imp.library);
  
  // Remove duplicates
  return [...new Set(unsupported)];
};

/**
 * Extract library information from imports for helpful messages
 */
export const getLibraryDetails = (libraryName: string): string => {
  const found = LIBRARY_INFO.find(lib => 
    lib.package === libraryName || lib.package.includes(libraryName)
  );
  
  if (found) {
    return `${found.name}: ${found.description}`;
  }
  
  return libraryName;
};
