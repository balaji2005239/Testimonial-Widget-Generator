import React, { useState } from 'react';
import { Testimonial, TemplateConfig, EmbedOptions } from './types/testimonial';
import { parseFile } from './utils/fileParser';
import { ThemeProvider } from './contexts/ThemeContext';
import FileUpload from './components/FileUpload';
import TestimonialEditor from './components/TestimonialEditor';
import TemplateSelector from './components/TemplateSelector';
import ThemeCustomizer from './components/ThemeCustomizer';
import TestimonialPreview from './components/TestimonialPreview';
import EmbedOptionsPanel from './components/EmbedOptionsPanel';
import EmbedCodeGenerator from './components/EmbedCodeGenerator';
import DarkModeToggle from './components/DarkModeToggle';

// Template components
import GridTemplate from './components/templates/GridTemplate';
import CarouselTemplate from './components/templates/CarouselTemplate';
import BlockQuoteTemplate from './components/templates/BlockQuoteTemplate';
import MasonryTemplate from './components/templates/MasonryTemplate';
import SliderTemplate from './components/templates/SliderTemplate';
import CompactTemplate from './components/templates/CompactTemplate';

const templates: TemplateConfig[] = [
  {
    id: 'grid',
    name: 'Grid Cards',
    description: 'Clean grid layout with testimonial cards',
    component: GridTemplate,
  },
  {
    id: 'carousel',
    name: 'Carousel',
    description: 'Auto-rotating carousel with navigation',
    component: CarouselTemplate,
  },
  {
    id: 'blockquote',
    name: 'Block Quotes',
    description: 'Elegant blockquote style layout',
    component: BlockQuoteTemplate,
  },
  {
    id: 'masonry',
    name: 'Masonry',
    description: 'Pinterest-style masonry layout',
    component: MasonryTemplate,
  },
  {
    id: 'slider',
    name: 'Horizontal Slider',
    description: 'Side-by-side testimonials with navigation',
    component: SliderTemplate,
  },
  {
    id: 'compact',
    name: 'Compact List',
    description: 'Space-efficient compact design',
    component: CompactTemplate,
  },
];

const defaultEmbedOptions: EmbedOptions = {
  limit: 10,
  autoscroll: true,
  theme: 'light',
};

function AppContent() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('grid');
  const [embedOptions, setEmbedOptions] = useState<EmbedOptions>(defaultEmbedOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || null;
  const selectedTestimonials = testimonials.filter(t => t.selected);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const parsedTestimonials = await parseFile(file);
      setTestimonials(parsedTestimonials);
      setEmbedOptions(prev => ({ ...prev, limit: Math.min(prev.limit, parsedTestimonials.length) }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const handleTestimonialsUpdate = (updatedTestimonials: Testimonial[]) => {
    setTestimonials(updatedTestimonials);
    const selectedCount = updatedTestimonials.filter(t => t.selected).length;
    setEmbedOptions(prev => ({ ...prev, limit: Math.min(prev.limit, selectedCount) }));
  };

  const handleEmbedOptionsChange = (options: EmbedOptions) => {
    const maxLimit = selectedTestimonials.length;
    setEmbedOptions({ ...options, limit: Math.min(options.limit, maxLimit) });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 right-0">
            <DarkModeToggle />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Testimonial Widget Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Upload your testimonial data, choose a beautiful design template, and generate 
            an embed code to showcase customer reviews on your website
          </p>
        </div>

        {/* File Upload Section */}
        <div className="mb-12">
          <FileUpload
            onFileUpload={handleFileUpload}
            isLoading={isLoading}
            error={error}
          />
        </div>

        {/* Testimonial Editor */}
        {testimonials.length > 0 && (
          <>
            <TestimonialEditor
              testimonials={testimonials}
              onUpdate={handleTestimonialsUpdate}
            />

            <ThemeCustomizer />

            <TemplateSelector
              templates={templates}
              selectedTemplate={selectedTemplateId}
              onTemplateSelect={handleTemplateSelect}
            />

            {selectedTestimonials.length > 0 && (
              <EmbedOptionsPanel
                options={embedOptions}
                onOptionsChange={handleEmbedOptionsChange}
                maxTestimonials={selectedTestimonials.length}
              />
            )}

            <div className="mb-12">
              <TestimonialPreview
                testimonials={testimonials}
                selectedTemplate={selectedTemplate}
                embedOptions={embedOptions}
              />
            </div>

            {selectedTestimonials.length > 0 && (
              <EmbedCodeGenerator
                testimonials={testimonials}
                selectedTemplateId={selectedTemplateId}
                embedOptions={embedOptions}
              />
            )}
          </>
        )}

        {/* Sample Data Section */}
        {testimonials.length === 0 && !isLoading && (
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-4xl mx-auto border dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Need sample data to test?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create a CSV or Excel file with the following sample data:
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 px-4 font-semibold text-gray-800 dark:text-white">name</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-800 dark:text-white">rating</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-800 dark:text-white">review</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-800 dark:text-white">photo_url</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-600">
                    <td className="py-2 px-4">Sarah Johnson</td>
                    <td className="py-2 px-4">5</td>
                    <td className="py-2 px-4">Amazing service! Highly recommend to everyone.</td>
                    <td className="py-2 px-4">https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-600">
                    <td className="py-2 px-4">Mike Chen</td>
                    <td className="py-2 px-4">4</td>
                    <td className="py-2 px-4">Great experience overall. Very professional team.</td>
                    <td className="py-2 px-4">https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=100</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Emma Wilson</td>
                    <td className="py-2 px-4">5</td>
                    <td className="py-2 px-4">Exceeded my expectations in every way!</td>
                    <td className="py-2 px-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;