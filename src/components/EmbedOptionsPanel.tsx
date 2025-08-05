import React from 'react';
import { Settings, Users, Play, Palette } from 'lucide-react';
import { EmbedOptions } from '../types/testimonial';
import { useTheme } from '../contexts/ThemeContext';

interface EmbedOptionsPanelProps {
  options: EmbedOptions;
  onOptionsChange: (options: EmbedOptions) => void;
  maxTestimonials: number;
}

const EmbedOptionsPanel: React.FC<EmbedOptionsPanelProps> = ({
  options,
  onOptionsChange,
  maxTestimonials,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`w-full max-w-6xl mx-auto mb-8 p-6 rounded-xl border ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    } shadow-sm`}>
      <div className="flex items-center mb-6">
        <Settings className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Embed Options
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Testimonial Limit */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Users className="w-4 h-4 inline mr-1" />
            Number of Testimonials
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="1"
              max={maxTestimonials}
              value={options.limit}
              onChange={(e) => onOptionsChange({ ...options, limit: Number(e.target.value) })}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className={`text-sm font-medium w-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {options.limit}
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Limit the number of testimonials displayed
          </p>
        </div>

        {/* Auto-scroll Toggle */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Play className="w-4 h-4 inline mr-1" />
            Auto-scroll (Carousel)
          </label>
          <button
            onClick={() => onOptionsChange({ ...options, autoscroll: !options.autoscroll })}
            className={`w-full p-3 rounded-lg border transition-colors ${
              options.autoscroll
                ? isDarkMode 
                  ? 'bg-blue-600 border-blue-500 text-white' 
                  : 'bg-blue-500 border-blue-500 text-white'
                : isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {options.autoscroll ? 'Enabled' : 'Disabled'}
          </button>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Automatically rotate testimonials in carousel
          </p>
        </div>

        {/* Theme Mode */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Palette className="w-4 h-4 inline mr-1" />
            Theme Mode
          </label>
          <select
            value={options.theme}
            onChange={(e) => onOptionsChange({ ...options, theme: e.target.value })}
            className={`w-full p-3 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
            <option value="auto">Auto (System)</option>
          </select>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Theme mode for the embedded widget
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmbedOptionsPanel;