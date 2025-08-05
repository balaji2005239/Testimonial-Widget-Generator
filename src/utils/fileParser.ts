import * as XLSX from 'xlsx';
import { Testimonial } from '../types/testimonial';

export const parseFile = async (file: File): Promise<Testimonial[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        let jsonData: any[] = [];

        if (file.name.endsWith('.csv')) {
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          jsonData = XLSX.utils.sheet_to_json(worksheet);
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          jsonData = XLSX.utils.sheet_to_json(worksheet);
        } else {
          reject(new Error('Unsupported file format. Please upload .xlsx or .csv files.'));
          return;
        }

        const testimonials: Testimonial[] = jsonData.map((row: any) => {
          if (!row.name || !row.rating || !row.review) {
            throw new Error('Missing required columns: name, rating, and review are required.');
          }

          return {
            id: Math.random().toString(36).substr(2, 9),
            name: String(row.name),
            rating: Math.min(5, Math.max(1, Number(row.rating))),
            review: String(row.review),
            photo_url: row.photo_url ? String(row.photo_url) : undefined,
            selected: true,
          };
        });

        if (testimonials.length === 0) {
          reject(new Error('No valid testimonial data found in the file.'));
          return;
        }

        resolve(testimonials);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));

    if (file.name.endsWith('.csv')) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
};