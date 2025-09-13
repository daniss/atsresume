import { createContext, useContext, useState, useEffect } from 'react';

const TemplateContext = createContext();

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

export const TEMPLATES = {
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional two-column layout with left sidebar',
    layout: 'two-column-left',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#000000'
    }
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Clean single-column layout with section dividers',
    layout: 'single-column',
    colors: {
      primary: '#1a1a1a',
      secondary: '#4a4a4a',
      accent: '#2563eb'
    }
  },
  executive: {
    id: 'executive',
    name: 'Executive',
    description: 'Professional two-column layout with right sidebar',
    layout: 'two-column-right',
    colors: {
      primary: '#000000',
      secondary: '#555555',
      accent: '#000000'
    }
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean layout with maximum white space',
    layout: 'minimal',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#000000'
    }
  }
};

export const ATS_FONTS = {
  arial: {
    id: 'arial',
    name: 'Arial',
    fontFamily: 'Arial, sans-serif',
    description: 'Most ATS-compatible sans-serif font'
  },
  helvetica: {
    id: 'helvetica',
    name: 'Helvetica',
    fontFamily: 'Helvetica, Arial, sans-serif',
    description: 'Clean professional sans-serif'
  },
  calibri: {
    id: 'calibri',
    name: 'Calibri',
    fontFamily: 'Calibri, Arial, sans-serif',
    description: 'Modern Microsoft font with excellent readability'
  },
  verdana: {
    id: 'verdana',
    name: 'Verdana',
    fontFamily: 'Verdana, Arial, sans-serif',
    description: 'Highly legible at all sizes'
  },
  tahoma: {
    id: 'tahoma',
    name: 'Tahoma',
    fontFamily: 'Tahoma, Arial, sans-serif',
    description: 'Compact and professional'
  },
  times: {
    id: 'times',
    name: 'Times New Roman',
    fontFamily: 'Times New Roman, Times, serif',
    description: 'Traditional serif font for formal documents'
  },
  georgia: {
    id: 'georgia',
    name: 'Georgia',
    fontFamily: 'Georgia, Times, serif',
    description: 'Readable serif font optimized for screen'
  }
};

export const TemplateProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [selectedFont, setSelectedFont] = useState('arial');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only loading from localStorage after mount
  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      const savedTemplate = localStorage.getItem('resumeTemplate');
      const savedFont = localStorage.getItem('resumeFont');
      
      if (savedTemplate && TEMPLATES[savedTemplate]) {
        setSelectedTemplate(savedTemplate);
      }
      
      if (savedFont && ATS_FONTS[savedFont]) {
        setSelectedFont(savedFont);
      }
    }
  }, []);

  // Save preferences to localStorage only after mount
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('resumeTemplate', selectedTemplate);
    }
  }, [selectedTemplate, mounted]);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('resumeFont', selectedFont);
    }
  }, [selectedFont, mounted]);

  const currentTemplate = TEMPLATES[selectedTemplate];
  const currentFont = ATS_FONTS[selectedFont];

  const value = {
    selectedTemplate,
    setSelectedTemplate,
    selectedFont,
    setSelectedFont,
    currentTemplate,
    currentFont,
    templates: TEMPLATES,
    fonts: ATS_FONTS
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};