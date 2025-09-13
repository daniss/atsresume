import { useEffect, useCallback, useRef, useState } from 'react';

const STORAGE_KEY = 'atsresume_data';
const SAVE_DELAY = 2000; // 2 seconds delay

const useAutoSave = () => {
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const saveTimeoutRef = useRef(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Save data to localStorage with debouncing
  const saveData = useCallback((data) => {
    if (typeof window === 'undefined' || !mounted) return;

    setIsSaving(true);
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setLastSaved(new Date());
        setIsSaving(false);
      } catch (error) {
        console.error('Failed to save data:', error);
        setIsSaving(false);
      }
    }, SAVE_DELAY);
  }, [mounted]);

  // Load data from localStorage
  const loadData = useCallback(() => {
    if (typeof window === 'undefined' || !mounted) return null;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        // Don't set lastSaved when loading to prevent hydration issues
        return data;
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
    return null;
  }, [mounted]);

  // Clear saved data
  const clearSavedData = useCallback(() => {
    if (typeof window === 'undefined' || !mounted) return;

    try {
      localStorage.removeItem(STORAGE_KEY);
      setLastSaved(null);
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  }, [mounted]);

  // Check if saved data exists
  const hasSavedData = useCallback(() => {
    if (typeof window === 'undefined' || !mounted) return false;
    return localStorage.getItem(STORAGE_KEY) !== null;
  }, [mounted]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    saveData,
    loadData,
    clearSavedData,
    hasSavedData,
    lastSaved,
    isSaving
  };
};

export default useAutoSave;
export { useAutoSave };