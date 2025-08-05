import React from 'react';
import { Star, User } from 'lucide-react';
import { Testimonial } from '../../types/testimonial';

interface MasonryTemplateProps {
  testimonials: Testimonial[];
}

const MasonryTemplate: React.FC<MasonryTemplateProps> = ({ testimonials }) => {
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
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 p-6 space-y-6">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="break-inside-avoid bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <div className="flex justify-center mb-4">
            {renderStars(testimonial.rating)}
          </div>
          
          <blockquote className="text-gray-600 italic leading-relaxed mb-4 text-center">
            "{testimonial.review}"
          </blockquote>
          
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-3">
              {testimonial.photo_url ? (
                <img
                  src={testimonial.photo_url}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling!.style.display = 'flex';
                  }}
                />
              ) : (
                <User className="w-5 h-5" />
              )}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold" style={{ display: 'none' }}>
                <User className="w-5 h-5" />
              </div>
            </div>
            <p className="font-semibold text-gray-800 text-center">{testimonial.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MasonryTemplate;