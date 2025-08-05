import React from 'react';
import { Star, User } from 'lucide-react';
import { Testimonial } from '../../types/testimonial';

interface CompactTemplateProps {
  testimonials: Testimonial[];
}

const CompactTemplate: React.FC<CompactTemplateProps> = ({ testimonials }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-w-md mx-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800 text-center">Customer Reviews</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                {testimonial.photo_url ? (
                  <img
                    src={testimonial.photo_url}
                    alt={testimonial.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.style.display = 'flex';
                    }}
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold" style={{ display: 'none' }}>
                  <User className="w-4 h-4" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-800 text-sm truncate">{testimonial.name}</p>
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {testimonial.review.length > 100 
                    ? `${testimonial.review.substring(0, 100)}...` 
                    : testimonial.review}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompactTemplate;