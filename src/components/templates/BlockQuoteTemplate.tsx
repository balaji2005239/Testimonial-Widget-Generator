import React from 'react';
import { Star, Quote, User } from 'lucide-react';
import { Testimonial } from '../../types/testimonial';

interface BlockQuoteTemplateProps {
  testimonials: Testimonial[];
}

const BlockQuoteTemplate: React.FC<BlockQuoteTemplateProps> = ({ testimonials }) => {
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
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="relative bg-white border-l-4 border-blue-500 shadow-lg rounded-r-xl p-8"
        >
          <Quote className="absolute top-4 left-4 w-8 h-8 text-blue-200" />
          
          <div className="ml-8">
            <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
              "{testimonial.review}"
            </blockquote>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
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
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <div className="flex mt-1">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockQuoteTemplate;