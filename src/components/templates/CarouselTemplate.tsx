import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Testimonial } from '../../types/testimonial';
import { useTheme } from '../../contexts/ThemeContext';
import { useSwipe } from '../../hooks/useSwipe';

interface CarouselTemplateProps {
  testimonials: Testimonial[];
  autoScroll?: boolean;
}

const CarouselTemplate: React.FC<CarouselTemplateProps> = ({ testimonials, autoScroll = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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

  useEffect(() => {
    if (autoScroll && !isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length, autoScroll, isPaused]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const swipeHandlers = useSwipe({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
  });

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];
  const borderRadiusClass = themeConfig.borderRadius === 'rounded' ? 'rounded-2xl' : 'rounded-none';
  const shadowClass = themeConfig.shadow 
    ? isDarkMode ? 'shadow-xl shadow-gray-900/20' : 'shadow-xl' 
    : 'shadow-none';

  return (
    <div 
      className={`relative ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      } p-8 ${borderRadiusClass} max-w-4xl mx-auto ${getFontClass(themeConfig.fontStyle)} ${shadowClass}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      {...swipeHandlers}
    >
      <div className="text-center">
        <div className={`w-20 h-20 ${
          themeConfig.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'
        } bg-gradient-to-br ${getColorClasses(themeConfig.primaryColor)} flex items-center justify-center text-white font-bold text-xl mx-auto mb-6`}>
          {currentTestimonial.photo_url ? (
            <img
              src={currentTestimonial.photo_url}
              alt={currentTestimonial.name}
              className={`w-20 h-20 ${
                themeConfig.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'
              } object-cover`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling!.style.display = 'flex';
              }}
            />
          ) : (
            <User className="w-8 h-8" />
          )}
          <div className={`w-20 h-20 ${
            themeConfig.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'
          } bg-gradient-to-br ${getColorClasses(themeConfig.primaryColor)} flex items-center justify-center text-white font-bold text-xl`} style={{ display: 'none' }}>
            <User className="w-8 h-8" />
          </div>
        </div>
        
        <div className="flex justify-center mb-4">
          {renderStars(currentTestimonial.rating)}
        </div>
        
        <blockquote className={`text-xl ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        } leading-relaxed mb-6 italic`}>
          "{currentTestimonial.review}"
        </blockquote>
        
        <p className={`font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        } text-lg`}>
          {currentTestimonial.name}
        </p>
      </div>

      <button
        onClick={goToPrevious}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
          isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
        } ${themeConfig.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'} p-2 ${
          themeConfig.shadow ? 'shadow-lg hover:shadow-xl' : ''
        } transition-all`}
      >
        <ChevronLeft className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>

      <button
        onClick={goToNext}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
          isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
        } ${themeConfig.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'} p-2 ${
          themeConfig.shadow ? 'shadow-lg hover:shadow-xl' : ''
        } transition-all`}
      >
        <ChevronRight className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
      </button>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 ${
              themeConfig.borderRadius === 'rounded' ? 'rounded-full' : 'rounded-none'
            } transition-colors ${
              index === currentIndex 
                ? `bg-${themeConfig.primaryColor}-500` 
                : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      {autoScroll && (
        <div className={`absolute top-4 right-4 text-xs ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {isPaused ? 'Paused' : 'Auto-playing'}
        </div>
      )}
    </div>
  );
};

export default CarouselTemplate;