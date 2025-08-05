import React from 'react';
import { TemplateConfig } from '../types/testimonial';
import { useTheme } from '../contexts/ThemeContext';

interface TemplateSelectorProps {
  templates: TemplateConfig[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onTemplateSelect,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
        Choose a Design Template
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-lg ${
              selectedTemplate === template.id
                ? isDarkMode
                  ? 'border-blue-500 bg-blue-900/20 shadow-lg'
                  : 'border-blue-500 bg-blue-50 shadow-lg'
                : isDarkMode
                  ? 'border-gray-600 bg-gray-800 hover:border-blue-400'
                  : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {template.name}
              </h4>
              {selectedTemplate === template.id && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {template.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;