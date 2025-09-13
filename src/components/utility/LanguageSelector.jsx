import { useLanguage } from '../../hooks/useLanguage';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
              language === 'en'
                ? 'bg-slate-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('fr')}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
              language === 'fr'
                ? 'bg-slate-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            FR
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;