import React, { useState } from 'react';
import { Edit3, Save, X, Star, Trash2 } from 'lucide-react';
import { Testimonial } from '../types/testimonial';
import { useTheme } from '../contexts/ThemeContext';

interface TestimonialEditorProps {
  testimonials: Testimonial[];
  onUpdate: (testimonials: Testimonial[]) => void;
}

const TestimonialEditor: React.FC<TestimonialEditorProps> = ({ testimonials, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Testimonial>>({});
  const { isDarkMode } = useTheme();

  const startEditing = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setEditForm(testimonial);
  };

  const saveEdit = () => {
    if (!editingId) return;
    
    const updatedTestimonials = testimonials.map(t => 
      t.id === editingId ? { ...t, ...editForm } : t
    );
    onUpdate(updatedTestimonials);
    setEditingId(null);
    setEditForm({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const deleteTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    onUpdate(updatedTestimonials);
  };

  const toggleSelection = (id: string) => {
    const updatedTestimonials = testimonials.map(t => 
      t.id === id ? { ...t, selected: !t.selected } : t
    );
    onUpdate(updatedTestimonials);
  };

  const selectAll = () => {
    const updatedTestimonials = testimonials.map(t => ({ ...t, selected: true }));
    onUpdate(updatedTestimonials);
  };

  const deselectAll = () => {
    const updatedTestimonials = testimonials.map(t => ({ ...t, selected: false }));
    onUpdate(updatedTestimonials);
  };

  const selectedCount = testimonials.filter(t => t.selected).length;

  return (
    <div className={`w-full max-w-6xl mx-auto mb-8 p-6 rounded-xl border ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    } shadow-sm`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Edit3 className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Edit Testimonials
          </h3>
          <span className={`ml-3 px-3 py-1 rounded-full text-sm ${
            isDarkMode 
              ? 'bg-blue-900 text-blue-200' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {selectedCount} of {testimonials.length} selected
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={selectAll}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Select All
          </button>
          <button
            onClick={deselectAll}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Deselect All
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`p-4 rounded-lg border transition-all ${
              testimonial.selected
                ? isDarkMode
                  ? 'border-blue-500 bg-blue-900/20'
                  : 'border-blue-300 bg-blue-50'
                : isDarkMode
                  ? 'border-gray-600 bg-gray-700/50'
                  : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={testimonial.selected || false}
                onChange={() => toggleSelection(testimonial.id)}
                className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              
              <div className="flex-1">
                {editingId === testimonial.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Name
                        </label>
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className={`w-full p-2 rounded-lg border ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Rating
                        </label>
                        <select
                          value={editForm.rating || 5}
                          onChange={(e) => setEditForm({ ...editForm, rating: Number(e.target.value) })}
                          className={`w-full p-2 rounded-lg border ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        >
                          {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Review
                      </label>
                      <textarea
                        value={editForm.review || ''}
                        onChange={(e) => setEditForm({ ...editForm, review: e.target.value })}
                        rows={3}
                        className={`w-full p-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Photo URL (optional)
                      </label>
                      <input
                        type="url"
                        value={editForm.photo_url || ''}
                        onChange={(e) => setEditForm({ ...editForm, photo_url: e.target.value })}
                        className={`w-full p-2 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={saveEdit}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => startEditing(testimonial)}
                          className={`p-1 rounded hover:bg-opacity-20 transition-colors ${
                            isDarkMode ? 'hover:bg-white' : 'hover:bg-gray-500'
                          }`}
                        >
                          <Edit3 className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        </button>
                        <button
                          onClick={() => deleteTestimonial(testimonial.id)}
                          className="p-1 rounded hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} italic`}>
                      "{testimonial.review}"
                    </p>
                    {testimonial.photo_url && (
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Photo: {testimonial.photo_url}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialEditor;