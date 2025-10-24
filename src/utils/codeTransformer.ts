/**
 * Transforms various React code patterns to work with react-live
 */
export const transformCode = (code: string): string => {
  let transformed = code.trim();

  // Remove import statements (react-live provides React automatically)
  transformed = transformed.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
  
  // Remove export default statements and get component name
  const exportDefaultMatch = transformed.match(/export\s+default\s+(\w+);?\s*$/m);
  if (exportDefaultMatch) {
    const componentName = exportDefaultMatch[1];
    transformed = transformed.replace(/export\s+default\s+\w+;?\s*$/m, '');
    // Add render call for the exported component
    transformed += `\n\nrender(<${componentName} />);`;
  }

  // Transform createRoot().render() to render()
  transformed = transformed.replace(
    /createRoot\s*\(\s*document\.getElementById\s*\(['"]root['"]\)\s*\)\.render\s*\(\s*(<[^>]+\s*\/>)\s*\);?/g,
    'render($1);'
  );
  
  // Transform ReactDOM.render() to render()
  transformed = transformed.replace(
    /ReactDOM\.render\s*\(\s*(<[^>]+\s*\/>)\s*,\s*document\.getElementById\s*\(['"]root['"]\)\s*\);?/g,
    'render($1);'
  );

  // If code has components but no render call, try to auto-render
  if (!transformed.includes('render(') && !transformed.includes('createRoot')) {
    // Check if there's a main component (last function or const)
    const functionMatch = transformed.match(/(?:function|const)\s+(\w+)\s*[=(]/g);
    if (functionMatch) {
      const matches = Array.from(transformed.matchAll(/(?:function|const)\s+(\w+)\s*[=(]/g));
      const lastComponent = matches[matches.length - 1]?.[1];
      
      if (lastComponent && /^[A-Z]/.test(lastComponent)) {
        transformed += `\n\nrender(<${lastComponent} />);`;
      }
    }
  }

  return transformed;
};

/**
 * Validates if code has proper structure
 */
export const validateCode = (code: string): { valid: boolean; error?: string } => {
  const trimmed = code.trim();
  
  if (!trimmed) {
    return { valid: false, error: 'Code cannot be empty' };
  }

  // Check for basic syntax errors
  const openBraces = (trimmed.match(/{/g) || []).length;
  const closeBraces = (trimmed.match(/}/g) || []).length;
  
  if (openBraces !== closeBraces) {
    return { valid: false, error: 'Unmatched braces detected' };
  }

  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  
  if (openParens !== closeParens) {
    return { valid: false, error: 'Unmatched parentheses detected' };
  }

  return { valid: true };
};
