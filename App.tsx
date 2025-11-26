
import React, { useState } from 'react';
import Header from './components/Header';
import UploadArea from './components/UploadArea';
import PromptSelector from './components/PromptSelector';
import ResultView from './components/ResultView';
import { generateProductBackground } from './services/geminiService';
import { AppState, BackgroundPreset } from './types';
import { BACKGROUND_PRESETS } from './constants';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // State for Selection
  const [activeCategory, setActiveCategory] = useState<'product' | 'fashion'>('product');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize preset when category changes
  const handleCategoryChange = (cat: 'product' | 'fashion') => {
    setActiveCategory(cat);
    // Auto-select the first preset of the new category to show feedback
    const firstPreset = BACKGROUND_PRESETS.find(p => p.category === cat);
    if (firstPreset) {
      setSelectedPresetId(firstPreset.id);
    } else {
      setSelectedPresetId(null);
    }
    setCustomPrompt('');
  };

  const handleFileSelected = (file: File) => {
    setOriginalFile(file);
    const objectUrl = URL.createObjectURL(file);
    setOriginalImagePreview(objectUrl);
    setAppState(AppState.UPLOADING); // Transition to prompting state
    // Set default preset
    const defaultPreset = BACKGROUND_PRESETS.find(p => p.category === activeCategory);
    if (defaultPreset) setSelectedPresetId(defaultPreset.id);
  };

  const handlePresetSelect = (preset: BackgroundPreset) => {
    setSelectedPresetId(preset.id);
    setCustomPrompt('');
  };

  const handleCustomPromptChange = (val: string) => {
    setCustomPrompt(val);
    if (val.length > 0) setSelectedPresetId(null);
  };

  const handleGenerate = async () => {
    if (!originalFile) return;

    setAppState(AppState.GENERATING);
    setErrorMsg(null);

    try {
      let promptToUse = '';
      
      if (selectedPresetId) {
        const preset = BACKGROUND_PRESETS.find(p => p.id === selectedPresetId);
        promptToUse = preset ? preset.prompt : '';
      } else {
        promptToUse = customPrompt;
      }

      if (!promptToUse) {
        setErrorMsg('يرجى اختيار خلفية أو كتابة وصف.');
        setAppState(AppState.UPLOADING);
        return;
      }

      // Determine if we are in fashion mode
      const isFashionMode = activeCategory === 'fashion';

      const resultImageBase64 = await generateProductBackground(
        originalFile, 
        promptToUse, 
        customPrompt, 
        isFashionMode
      );
      
      setGeneratedImage(resultImageBase64);
      setAppState(AppState.SUCCESS);

    } catch (err: any) {
      console.error(err);
      setErrorMsg('حدث خطأ أثناء معالجة الصورة. يرجى المحاولة مرة أخرى.');
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setOriginalFile(null);
    setOriginalImagePreview(null);
    setGeneratedImage(null);
    setErrorMsg(null);
    // Keep category but reset preset
    const defaultPreset = BACKGROUND_PRESETS.find(p => p.category === activeCategory);
    if (defaultPreset) setSelectedPresetId(defaultPreset.id);
    setCustomPrompt('');
  };

  // Helper to get active preset details for preview
  const activePreset = BACKGROUND_PRESETS.find(p => p.id === selectedPresetId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header />
      
      <main className="flex-grow max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[600px] border border-gray-100">
          
          {/* Header Section inside Card */}
          <div className={`
            p-8 text-white text-center transition-colors duration-500
            ${activeCategory === 'fashion' 
              ? 'bg-gradient-to-r from-pink-500 to-rose-600' 
              : 'bg-gradient-to-r from-primary to-indigo-700'}
          `}>
             <h2 className="text-3xl font-bold mb-2">
               {activeCategory === 'fashion' ? 'غرفة القياس الافتراضية' : 'استوديو المنتجات الذكي'}
             </h2>
             <p className="text-white/90 max-w-lg mx-auto">
               {activeCategory === 'fashion' 
                 ? 'جرّب الملابس على موديلات واقعية باستخدام الذكاء الاصطناعي.' 
                 : 'حوّل صور منتجاتك إلى لقطات احترافية في ثوانٍ.'}
             </p>
          </div>

          <div className="p-6 md:p-10 space-y-8">
            
            {/* Step 1: Upload */}
            {appState === AppState.IDLE && (
              <div className="animate-fade-in-up max-w-3xl mx-auto space-y-8">
                {/* Category Selection for Landing */}
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => handleCategoryChange('product')}
                    className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                      activeCategory === 'product' ? 'bg-primary text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    📦 منتجات عامة
                  </button>
                  <button 
                    onClick={() => handleCategoryChange('fashion')}
                    className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                      activeCategory === 'fashion' ? 'bg-pink-500 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    👗 ملابس وموضة
                  </button>
                </div>
                <UploadArea onFileSelected={handleFileSelected} />
              </div>
            )}

            {/* Step 2: Configure & Generate */}
            {(appState === AppState.UPLOADING || appState === AppState.GENERATING || appState === AppState.ERROR) && originalImagePreview && (
               <div className="grid md:grid-cols-2 gap-8 lg:gap-12 animate-fade-in items-start">
                  
                  {/* Left Column: Live Preview */}
                  <div className="space-y-4 sticky top-6 z-10">
                     <div 
                        className="rounded-2xl overflow-hidden border-2 transition-all duration-500 relative group bg-gray-50"
                        style={{
                          borderColor: activePreset?.color || '#e5e7eb',
                          boxShadow: `0 10px 40px -10px ${activePreset?.color || '#000000'}30`
                        }}
                     >
                        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                           {/* Badge for selected preset */}
                           <div className="bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300">
                              {selectedPresetId && activePreset ? (
                                <>
                                  <span>{activePreset.icon}</span>
                                  <span>{activePreset.name}</span>
                                </>
                              ) : (
                                <>
                                  <span>✏️</span>
                                  <span>تخصيص يدوي</span>
                                </>
                              )}
                           </div>
                           {/* Delete button */}
                           <button 
                             onClick={handleReset}
                             className="bg-white/90 p-2 rounded-full shadow-sm hover:bg-white text-red-500 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                             title="حذف الصورة"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                           </button>
                        </div>

                        {/* Image with Dynamic Filter */}
                        <div className="relative overflow-hidden bg-gray-100">
                          <img 
                            src={originalImagePreview} 
                            alt="Original" 
                            className="w-full h-auto max-h-[500px] object-contain transition-all duration-500 ease-in-out mx-auto" 
                            style={{
                              filter: selectedPresetId ? activePreset?.filter : 'none'
                            }}
                          />
                        </div>
                        
                        {/* Overlay text for Custom Prompt */}
                        {!selectedPresetId && customPrompt && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-12 text-white">
                            <p className="text-sm font-light opacity-80 mb-1">الوصف المخصص:</p>
                            <p className="text-sm font-medium line-clamp-2">{customPrompt}</p>
                          </div>
                        )}
                     </div>
                     <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                       <span className={`w-2 h-2 rounded-full animate-pulse ${activeCategory === 'fashion' ? 'bg-pink-500' : 'bg-green-500'}`}></span>
                       معاينة فورية للجو العام
                     </p>
                  </div>

                  {/* Right Column: Controls */}
                  <div className="space-y-6">
                    <div>
                       <h3 className="text-lg font-bold text-gray-900 mb-1">إعدادات {activeCategory === 'fashion' ? 'الموديل' : 'المشهد'}</h3>
                       <p className="text-sm text-gray-500">
                         {activeCategory === 'fashion' 
                           ? 'اختر مظهر الموديل والبيئة المحيطة' 
                           : 'اختر الخلفية المناسبة لإبراز منتجك'}
                       </p>
                    </div>
                    
                    <PromptSelector 
                      selectedPresetId={selectedPresetId}
                      customPrompt={customPrompt}
                      onSelectPreset={handlePresetSelect}
                      onCustomPromptChange={handleCustomPromptChange}
                      isGenerating={appState === AppState.GENERATING}
                      onGenerate={handleGenerate}
                      activeCategory={activeCategory}
                      onCategoryChange={handleCategoryChange}
                    />

                    {errorMsg && (
                      <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200 animate-shake flex items-center gap-2">
                        <span>⚠️</span>
                        {errorMsg}
                      </div>
                    )}
                  </div>
               </div>
            )}

            {/* Step 3: Result */}
            {appState === AppState.SUCCESS && generatedImage && originalImagePreview && (
              <ResultView 
                originalImage={originalImagePreview}
                generatedImage={generatedImage}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>© 2025 Product Studio AI. Powered by Gemini.</p>
      </footer>
    </div>
  );
}

export default App;
