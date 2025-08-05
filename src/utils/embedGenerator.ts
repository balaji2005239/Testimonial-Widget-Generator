import { Testimonial, EmbedOptions } from '../types/testimonial';

export const generateEmbedCode = (
  testimonials: Testimonial[], 
  templateId: string, 
  options: EmbedOptions,
  themeConfig: any
): string => {
  const selectedTestimonials = testimonials.filter(t => t.selected);
  const limitedTestimonials = selectedTestimonials.slice(0, options.limit);
  const base64Data = btoa(JSON.stringify(limitedTestimonials));
  const themeData = btoa(JSON.stringify(themeConfig));
  
  return `<!-- Testimonial Widget -->
<div id="testimonial-widget"></div>
<script 
  src="https://your-domain.com/testimonial-widget.js"
  data-template="${templateId}"
  data-testimonials="${base64Data}"
  data-limit="${options.limit}"
  data-autoscroll="${options.autoscroll}"
  data-theme="${options.theme}"
  data-theme-config="${themeData}"
  defer>
</script>

<!-- 
  Usage Instructions:
  1. Copy and paste this code into your HTML
  2. The widget will automatically render in the div with id="testimonial-widget"
  3. Customize the template by changing data-template attribute
  4. Available templates: grid, carousel, blockquote, masonry, slider, compact
  5. Set data-limit to control number of testimonials shown
  6. Set data-autoscroll="true" for auto-rotating carousels
  7. Set data-theme="dark" for dark mode
-->`;
};