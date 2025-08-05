import React from 'react';
import { Star, User } from 'lucide-react';
import { Testimonial } from '../../types/testimonial';
import { useTheme } from '../../contexts/ThemeContext';

interface GridTemplateProps {
  testimonials: Testimonial[];
}

const GridTemplate: React.FC<GridTemplateProps> = ({ testimonials }) => {
  const { themeConfig, isDarkMode } = useTheme();

  const getColorClasses = (color: string) => {
    const colors = {
      blue: isDarkMode ? 'from-blue-600 to-blue-800' : 'from-blue-500 to-purple-600',
      green: isDarkMode ? 'from-green-600 to-green-800' : 'from-green-500 to-emerald-600',
      purple: isDarkMode ? 'from-purple-600 to-purple-800' : 'from-purple-500 to-pink-600',
      red: isDarkMode ? 'from-red-600 to-red-800' : 'from-red-500 to-rose-600',
      orange: isDarkMode ? 'from-orange-600 to-orange-800' : 'from-orange-500 to-amber-600',
      pink: isDarkMode ? 'from-pink-600 to-pink-800' : 'from-pink-500 to-rose-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getFontClass = (font: string) => {
    const fonts = {
      system: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
    };
    return fonts[font as keyof typeof fonts] || fonts.system;
  };

  const borderRadiusClass = themeConfig.borderRadius === 'rounded' ? 'rounded-xl' : 'rounded-none';
  const shadowClass = themeConfig.shadow 
    ? isDarkMode ? 'shadow-lg shadow-gray-900/20' : 'shadow-lg' 
    : 'shadow-none';

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ${getFontClass(themeConfig.fontStyle)}`}>
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          } ${borderRadiusClass} ${shadowClass} p-6 hover:shadow-xl transition-all duration-300 border`}
        >
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 ${
              themeConfig.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'
            } bg-gradient-to-br ${getColorClasses(themeConfig.primaryColor)} flex items-center justify-center text-white font-semibold mr-4`}>
              {testimonial.photo_url ? (
                <img
                  src={testimonial.photo_url}
                  alt={testimonial.name}
                  className={`w-12 h-12 ${
                    themeConfig.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'
                  } object-cover`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling!.style.display = 'flex';
                  }}
                />
              ) : (
                <User className="w-6 h-6" />
              )}
              <div className={`w-12 h-12 ${
                themeConfig.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'
              } bg-gradient-to-br ${getColorClasses(themeConfig.primaryColor)} flex items-center justify-center text-white font-semibold`} style={{ display: 'none' }}>
                <User className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {testimonial.name}
              </h3>
              <div className="flex mt-1">{renderStars(testimonial.rating)}</div>
            </div>
          </div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} italic leading-relaxed`}>
            "{testimonial.review}"
          </p>
        </div>
      ))}
    </div>
  );
};

export default GridTemplate;