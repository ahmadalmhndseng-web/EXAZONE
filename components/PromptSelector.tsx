
import React, { useState } from 'react';
import { BACKGROUND_PRESETS } from '../constants';
import { BackgroundPreset } from '../types';

interface PromptSelectorProps {
  selectedPresetId: string | null;
  customPrompt: string;
  onSelectPreset: (preset: BackgroundPreset) => void;
  onCustomPromptChange: (prompt: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  activeCategory: 'product' | 'fashion';
  onCategoryChange: (category: 'product' | 'fashion') => void;
}

const PromptSelector: React.FC<PromptSelectorProps> = ({
  selectedPresetId,
  customPrompt,
  onSelectPreset,
  onCustomPromptChange,
  isGenerating,
  onGenerate,
  activeCategory,
  onCategoryChange
}) => {
  const [mode, setMode] = useState<'preset' | 'custom'>('preset');
  const [activeGender, setActiveGender] = useState<'female' | 'male'>('female');

  // Filter presets based on active category and gender (if fashion)
  const displayedPresets = BACKGROUND_PRESETS.filter(p => {
    if (p.category !== activeCategory) return false;
    if (activeCategory === 'fashion') {
      return p.gender === activeGender;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Category Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-xl mb-4">
        <button
          onClick={() => onCategoryChange('product')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
            activeCategory === 'product'
              ? 'bg-white text-primary shadow-md'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>📦</span>
          <span>خلفيات منتجات</span>
        </button>
        <button
          onClick={() => onCategoryChange('fashion')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
            activeCategory === 'fashion'
              ? 'bg-white text-pink-600 shadow-md'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>👗</span>
          <span>عارض أزياء (موديل)</span>
        </button>
      </div>

      {/* Gender Tabs (Only for Fashion) */}
      {activeCategory === 'fashion' && (
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveGender('female')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeGender === 'female' 
                  ? 'bg-white text-pink-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              نساء 👩
            </button>
            <button
              onClick={() => setActiveGender('male')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeGender === 'male' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              رجال 👨
            </button>
          </div>
        </div>
      )}

      {/* Mode Selector (Presets vs Custom) */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setMode('preset')}
          className={`pb-2 px-4 text-sm font-medium transition-all relative ${
            mode === 'preset' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          خيارات جاهزة
          {mode === 'preset' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-full"></div>}
        </button>
        <button
          onClick={() => setMode('custom')}
          className={`pb-2 px-4 text-sm font-medium transition-all relative ${
            mode === 'custom' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          وصف خاص
          {mode === 'custom' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-full"></div>}
        </button>
      </div>

      {mode === 'preset' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-fade-in">
          {displayedPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`
                group flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden
                ${selectedPresetId === preset.id 
                  ? activeCategory === 'fashion' 
                      ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md scale-[1.02]' 
                      : 'border-primary bg-primary/5 text-primary shadow-md scale-[1.02]' 
                  : 'border-transparent bg-white shadow-sm hover:shadow-lg text-gray-600 hover:bg-gray-50 hover:scale-[1.02] hover:-translate-y-1'}
              `}
            >
              <span className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">{preset.icon}</span>
              <span className="text-sm font-bold text-center">{preset.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in">
          <label className="block text-sm font-medium text-gray-700">
            {activeCategory === 'fashion' ? 'وصف الموديل والمكان' : 'وصف الخلفية والإضاءة'}
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => onCustomPromptChange(e.target.value)}
            placeholder={activeCategory === 'fashion' 
              ? (activeGender === 'female' 
                  ? "مثال: موديل ترتدي فستان صيفي في حديقة عامة وقت الغروب..." 
                  : "مثال: موديل رجل يرتدي بدلة رسمية في مكتب حديث...")
              : "مثال: على صخرة سوداء في الفضاء، إضاءة نيون زرقاء..."}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[120px] shadow-sm resize-none"
          />
          <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded text-center">
            {activeCategory === 'fashion' 
              ? "💡 نصيحة: حدد مواصفات الموديل والمكان بوضوح للحصول على أفضل نتيجة." 
              : "💡 نصيحة: صف الخامات (خشب، رخام) والإضاءة للحصول على أفضل نتيجة."}
          </p>
        </div>
      )}

      <button
        onClick={onGenerate}
        disabled={isGenerating || (mode === 'custom' && !customPrompt)}
        className={`
          w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform active:scale-[0.98]
          ${isGenerating 
            ? 'bg-gray-400 cursor-not-allowed opacity-75' 
            : activeCategory === 'fashion' 
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-rose-500 hover:to-pink-600 hover:shadow-pink-500/25'
                : 'bg-gradient-to-r from-primary to-indigo-700 hover:from-indigo-500 hover:to-primary hover:shadow-indigo-500/25'}
        `}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            جاري {activeCategory === 'fashion' ? 'تركيب الملابس' : 'المعالجة'}...
          </span>
        ) : (
          activeCategory === 'fashion' ? 'توليد الموديل ✨' : 'توليد الخلفية ✨'
        )}
      </button>
    </div>
  );
};

export default PromptSelector;
