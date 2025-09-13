import { useState, useEffect } from 'react';

const usePrintMode = () => {
  const [isPrintMode, setIsPrintMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const printMediaQuery = window.matchMedia('print');
      
      const handlePrintChange = (e) => {
        setIsPrintMode(e.matches);
      };

      // Set initial state
      setIsPrintMode(printMediaQuery.matches);
      
      // Listen for changes
      printMediaQuery.addEventListener('change', handlePrintChange);
      
      // Also listen for beforeprint/afterprint events as fallback
      const handleBeforePrint = () => setIsPrintMode(true);
      const handleAfterPrint = () => setIsPrintMode(false);
      
      window.addEventListener('beforeprint', handleBeforePrint);
      window.addEventListener('afterprint', handleAfterPrint);

      return () => {
        printMediaQuery.removeEventListener('change', handlePrintChange);
        window.removeEventListener('beforeprint', handleBeforePrint);
        window.removeEventListener('afterprint', handleAfterPrint);
      };
    }
  }, []);

  return isPrintMode;
};

export default usePrintMode;
export { usePrintMode };