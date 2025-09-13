import { useTemplate } from './TemplateContext';

const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate, templates, currentTemplate } = useTemplate();

  return (
    <div className="mb-6">
      <h3 className="input-title mb-3">Resume Template</h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.values(templates).map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`p-3 rounded-lg border-2 text-left transition-all ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <h4 className="font-semibold text-gray-800">{template.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            <div className="mt-2 text-xs text-gray-500">
              Layout: {template.layout.replace('-', ' ')}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Current:</strong> {currentTemplate.name} - {currentTemplate.description}
        </p>
      </div>
    </div>
  );
};

export default TemplateSelector;