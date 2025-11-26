import React, { useState } from 'react';

interface ResultViewProps {
  originalImage: string;
  generatedImage: string;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ originalImage, generatedImage, onReset }) => {
  const [viewMode, setViewMode] = useState<'compare' | 'result'>('result');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-gray-100 p-1 rounded-lg w-fit mx-auto">
         <button
          onClick={() => setViewMode('result')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            viewMode === 'result' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          النتيجة النهائية
        </button>
        <button
          onClick={() => setViewMode('compare')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            viewMode === 'compare' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          مقارنة
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 overflow-hidden">
        {viewMode === 'result' ? (
          <div className="relative group">
            <img 
              src={generatedImage} 
              alt="Generated Result" 
              className="w-full h-auto rounded-lg object-contain max-h-[500px] mx-auto"
            />
            <div className="absolute top-2 left-2">
              <span className="bg-green-500/90 text-white text-xs px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">
                 تم بالذكاء الاصطناعي
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
             <div className="relative">
                <p className="text-center text-sm font-medium text-gray-500 mb-2">الأصلية</p>
                <img 
                  src={originalImage} 
                  alt="Original" 
                  className="w-full h-auto rounded-lg object-contain max-h-[400px]"
                />
             </div>
             <div className="relative">
                <p className="text-center text-sm font-medium text-primary mb-2">بعد التعديل</p>
                <img 
                  src={generatedImage} 
                  alt="Generated" 
                  className="w-full h-auto rounded-lg object-contain max-h-[400px]"
                />
             </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          تجربة صورة أخرى
        </button>
        <a 
          href={generatedImage} 
          download="product-ai-studio.png"
          className="flex-1 py-3 bg-primary text-white text-center rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          تحميل الصورة
        </a>
      </div>
    </div>
  );
};

export default ResultView;