import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Testimonial } from '../../types/testimonial';

interface SliderTemplateProps {
  testimonials: Testimonial[];
}

const SliderTemplate: React.FC<SliderTemplateProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

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

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="relative bg-gray-50 p-8 rounded-2xl max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">What Our Customers Say</h3>
        
        <div className="flex space-x-2">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleTestimonials.map((testimonial, index) => (
          <div
            key={currentIndex + index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-4">
                {testimonial.photo_url ? (
                  <img
                    src={testimonial.photo_url}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.style.display = 'flex';
                    }}
                  />
                ) : (
                  <User className="w-6 h-6" />
                )}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold" style={{ display: 'none' }}>
                  <User className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <div className="flex mt-1">{renderStars(testimonial.rating)}</div>
              </div>
            </div>
            <p className="text-gray-600 italic leading-relaxed">"{testimonial.review}"</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <span className="text-sm text-gray-500">
          {currentIndex + 1}-{Math.min(currentIndex + itemsPerPage, testimonials.length)} of {testimonials.length}
        </span>
      </div>
    </div>
  );
};

export default SliderTemplate;