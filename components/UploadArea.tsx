import React, { useCallback, useState } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from '../constants';

interface UploadAreaProps {
  onFileSelected: (file: File) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError('نوع الملف غير مدعوم. يرجى رفع صورة (JPG, PNG, WEBP).');
      return false;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`حجم الملف كبير جداً. الحد الأقصى هو ${MAX_FILE_SIZE_MB} ميجابايت.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelected(file);
      }
    }
  }, [onFileSelected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelected(file);
      }
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
          ${isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-gray-300 hover:border-primary/50 bg-gray-50'}
          ${error ? 'border-red-400 bg-red-50' : ''}
        `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-3xl">
            📷
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">اضغط لرفع صورة المنتج</h3>
            <p className="text-sm text-gray-500 mt-1">أو اسحب وأفلت الصورة هنا</p>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            يدعم JPG, PNG, WEBP (بحد أقصى {MAX_FILE_SIZE_MB}MB)
          </p>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center animate-pulse">{error}</p>
      )}
    </div>
  );
};

export default UploadArea;