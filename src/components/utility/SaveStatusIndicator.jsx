import { useContext, useState, useEffect } from 'react';
import { ResumeContext } from '../builder';

const SaveStatusIndicator = () => {
  const { lastSaved, isSaving } = useContext(ResumeContext);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only showing content after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!mounted) {
    // Show a neutral state during SSR to prevent hydration mismatch
    return (
      <div className="fixed bottom-4 right-4 exclude-print">
        <div className="bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-lg text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 exclude-print">
      <div className="bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-lg text-sm">
        {isSaving ? (
          <div className="flex items-center gap-2 text-blue-600">
            <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Saving...</span>
          </div>
        ) : lastSaved ? (
          <div className="flex items-center gap-2 text-green-600">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>Saved at {formatTime(lastSaved)}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span>Not saved</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveStatusIndicator;