import React from 'react';
import { Testimonial, TemplateConfig } from '../types/testimonial';
import { useTheme } from '../contexts/ThemeContext';

interface TestimonialPreviewProps {
  testimonials: Testimonial[];
  selectedTemplate: TemplateConfig | null;
  embedOptions?: any;
}

const TestimonialPreview: React.FC<TestimonialPreviewProps> = ({
  testimonials,
  selectedTemplate,
  embedOptions,
}) => {
  const { isDarkMode } = useTheme();
  
  const selectedTestimonials = testimonials.filter(t => t.selected);
  const displayTestimonials = embedOptions?.limit 
    ? selectedTestimonials.slice(0, embedOptions.limit)
    : selectedTestimonials;

  if (!selectedTemplate || displayTestimonials.length === 0) {
    return (
      <div className={`w-full ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      } rounded-xl p-12 text-center`}>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
          Upload testimonials and select a template to see the preview
        </p>
      </div>
    );
  }

  const TemplateComponent = selectedTemplate.component;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Live Preview
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className={`${
            isDarkMode 
              ? 'bg-blue-900 text-blue-200' 
              : 'bg-blue-100 text-blue-800'
          } px-3 py-1 rounded-full font-medium`}>
            {selectedTemplate.name}
          </span>
          <span className={`${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          } px-3 py-1 rounded-full`}>
            {displayTestimonials.length} testimonial{displayTestimonials.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      <div className={`${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      } rounded-xl p-6 shadow-sm border`}>
        <TemplateComponent 
          testimonials={displayTestimonials} 
          autoScroll={embedOptions?.autoscroll}
        />
      </div>
    </div>
  );
};

export default TestimonialPreview;