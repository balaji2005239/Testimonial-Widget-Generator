import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';
import { Testimonial, EmbedOptions } from '../types/testimonial';
import { generateEmbedCode } from '../utils/embedGenerator';
import { useTheme } from '../contexts/ThemeContext';

interface EmbedCodeGeneratorProps {
  testimonials: Testimonial[];
  selectedTemplateId: string;
  embedOptions: EmbedOptions;
}

const EmbedCodeGenerator: React.FC<EmbedCodeGeneratorProps> = ({
  testimonials,
  selectedTemplateId,
  embedOptions,
}) => {
  const [copied, setCopied] = useState(false);
  const { themeConfig, isDarkMode } = useTheme();
  
  const embedCode = generateEmbedCode(testimonials, selectedTemplateId, embedOptions, themeConfig);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const selectedTestimonials = testimonials.filter(t => t.selected);
  if (selectedTestimonials.length === 0 || !selectedTemplateId) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className={`${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      } rounded-xl p-6 shadow-sm border`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Code className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Embed Code
            </h3>
          </div>
          
          <button
            onClick={copyToClipboard}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              copied
                ? isDarkMode
                  ? 'bg-green-900 text-green-200 border border-green-700'
                  : 'bg-green-100 text-green-700 border border-green-200'
                : isDarkMode
                  ? 'bg-blue-700 text-white hover:bg-blue-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        <div className={`${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-900'
        } rounded-lg p-4 overflow-x-auto`}>
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
            <code>{embedCode}</code>
          </pre>
        </div>

        <div className={`mt-4 p-4 rounded-lg ${
          isDarkMode 
            ? 'bg-blue-900/20 border border-blue-800' 
            : 'bg-blue-50'
        }`}>
          <h4 className={`font-medium mb-2 ${
            isDarkMode ? 'text-blue-200' : 'text-blue-800'
          }`}>
            Integration Instructions:
          </h4>
          <ul className={`text-sm space-y-1 ${
            isDarkMode ? 'text-blue-300' : 'text-blue-700'
          }`}>
            <li>1. Copy the embed code above</li>
            <li>2. Paste it into your website's HTML where you want the testimonials to appear</li>
            <li>3. The widget will automatically load and display your testimonials</li>
            <li>4. You can customize the template by changing the data-template attribute</li>
            <li>5. Adjust data-limit to control the number of testimonials shown</li>
            <li>6. Set data-autoscroll="true" for auto-rotating carousels</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmbedCodeGenerator;