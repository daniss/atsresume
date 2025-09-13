import { useTemplate } from './TemplateContext';

const FontSelector = () => {
  const { selectedFont, setSelectedFont, fonts, currentFont } = useTemplate();

  return (
    <div className="mb-6">
      <h3 className="input-title mb-3">ATS-Friendly Font</h3>
      <div className="grid grid-cols-1 gap-2">
        {Object.values(fonts).map((font) => (
          <button
            key={font.id}
            onClick={() => setSelectedFont(font.id)}
            className={`p-3 rounded-lg border-2 text-left transition-all ${
              selectedFont === font.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
            style={{ fontFamily: font.fontFamily }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-800">{font.name}</h4>
                <p className="text-sm text-gray-600">{font.description}</p>
              </div>
              <span className="text-xs text-gray-500 italic">Sample Text</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Current Font:</strong> {currentFont.name} - {currentFont.description}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Font family: {currentFont.fontFamily}
        </p>
      </div>
    </div>
  );
};

export default FontSelector;