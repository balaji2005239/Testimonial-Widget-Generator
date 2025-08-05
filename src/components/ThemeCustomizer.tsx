import React from 'react';
import { Palette, Type, Square, Eye } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeCustomizer: React.FC = () => {
  const { themeConfig, updateThemeConfig, isDarkMode } = useTheme();

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
  ];

  const fontOptions = [
    { value: 'system', label: 'System' },
    { value: 'serif', label: 'Serif' },
    { value: 'mono', label: 'Monospace' },
  ];

  return (
    <div className={`w-full max-w-6xl mx-auto mb-8 p-6 rounded-xl border ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    } shadow-sm`}>
      <div className="flex items-center mb-6">
        <Palette className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Theme Customization
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Primary Color */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Primary Color
          </label>
          <div className="grid grid-cols-3 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => updateThemeConfig({ primaryColor: color.value })}
                className={`w-10 h-10 rounded-lg ${color.class} relative transition-transform hover:scale-110 ${
                  themeConfig.primaryColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                }`}
                title={color.label}
              >
                {themeConfig.primaryColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Font Style */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Type className="w-4 h-4 inline mr-1" />
            Font Style
          </label>
          <select
            value={themeConfig.fontStyle}
            onChange={(e) => updateThemeConfig({ fontStyle: e.target.value })}
            className={`w-full p-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Border Radius */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Square className="w-4 h-4 inline mr-1" />
            Border Style
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => updateThemeConfig({ borderRadius: 'rounded' })}
              className={`flex-1 p-2 rounded-lg border transition-colors ${
                themeConfig.borderRadius === 'rounded'
                  ? isDarkMode 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-blue-500 border-blue-500 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Rounded
            </button>
            <button
              onClick={() => updateThemeConfig({ borderRadius: 'square' })}
              className={`flex-1 p-2 border transition-colors ${
                themeConfig.borderRadius === 'square'
                  ? isDarkMode 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-blue-500 border-blue-500 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Square
            </button>
          </div>
        </div>

        {/* Shadow Toggle */}
        <div>
          <label className={`block text-sm font-medium mb-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Eye className="w-4 h-4 inline mr-1" />
            Card Shadow
          </label>
          <button
            onClick={() => updateThemeConfig({ shadow: !themeConfig.shadow })}
            className={`w-full p-2 rounded-lg border transition-colors ${
              themeConfig.shadow
                ? isDarkMode 
                  ? 'bg-blue-600 border-blue-500 text-white' 
                  : 'bg-blue-500 border-blue-500 text-white'
                : isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {themeConfig.shadow ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;