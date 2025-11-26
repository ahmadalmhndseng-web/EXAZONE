
import { BackgroundPreset } from './types';

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  // --- Product Backgrounds ---
  {
    id: 'studio-white',
    name: 'ستوديو أبيض نقي',
    prompt: 'on a clean, pure white infinity background, professional studio lighting, soft shadows, 8k resolution, commercial product photography',
    icon: '⬜',
    color: '#e2e8f0',
    filter: 'brightness(1.05) contrast(1.05)',
    category: 'product'
  },
  {
    id: 'wooden-table',
    name: 'طاولة خشبية دافئة',
    prompt: 'placed on a rustic textured wooden table, warm sunlight coming from a window, shallow depth of field, cozy atmosphere, photorealistic',
    icon: '🪵',
    color: '#78350f',
    filter: 'sepia(0.2) contrast(1.1) brightness(0.95)',
    category: 'product'
  },
  {
    id: 'marble-luxury',
    name: 'رخام فاخر',
    prompt: 'on a luxurious white marble countertop with grey veins, soft elegant lighting, high-end fashion vibe, sharp focus',
    icon: '🏛️',
    color: '#94a3b8',
    filter: 'grayscale(0.1) brightness(1.05) contrast(0.95)',
    category: 'product'
  },
  {
    id: 'nature-outdoor',
    name: 'طبيعة خارجية',
    prompt: 'placed on a rock in a blurred forest background, natural sunlight, bokeh effect, fresh and organic feel',
    icon: '🌿',
    color: '#15803d',
    filter: 'saturate(1.2) brightness(1.05)',
    category: 'product'
  },
  {
    id: 'beach-sunset',
    name: 'شاطئ عند الغروب',
    prompt: 'on clean sand at the beach during golden hour sunset, soft sea waves in the background, warm orange glow',
    icon: '🌅',
    color: '#f59e0b',
    filter: 'sepia(0.3) saturate(1.2) brightness(1.1)',
    category: 'product'
  },
  {
    id: 'urban-street',
    name: 'شارع حضري',
    prompt: 'on a concrete surface in a modern city street, blurred urban lights in background, streetwear style, edgy lighting',
    icon: '🏙️',
    color: '#374151',
    filter: 'contrast(1.2) saturate(0.9) brightness(0.9)',
    category: 'product'
  },
  {
    id: 'kitchen-modern',
    name: 'مطبخ مودرن',
    prompt: 'placed on a modern kitchen island counter, blurred kitchen appliances in background, bright morning daylight, interior design photography',
    icon: '🍳',
    color: '#cbd5e1',
    filter: 'brightness(1.1) contrast(0.95)',
    category: 'product'
  },
  {
    id: 'spa-water',
    name: 'سبا ومياه',
    prompt: 'placed on a wet dark stone surface near calm water ripples and green bamboo leaves, spa atmosphere, zen, soft lighting, reflection',
    icon: '💧',
    color: '#06b6d4',
    filter: 'brightness(1.1) hue-rotate(180deg) opacity(0.9) saturate(0.8)', // Simulated cool tone
    category: 'product'
  },
  {
    id: 'pastel-podium',
    name: 'منصة باستيل',
    prompt: 'placed on a minimal pastel pink geometric podium, soft studio lighting, abstract shapes in background, trendy art direction',
    icon: '🎨',
    color: '#f9a8d4',
    filter: 'brightness(1.1) saturate(0.8) sepia(0.1)',
    category: 'product'
  },
  {
    id: 'coffee-shop',
    name: 'مقهى دافئ',
    prompt: 'on a wooden table in a cozy coffee shop, blurred cafe background with warm lights, steam, lifestyle photography',
    icon: '☕',
    color: '#92400e',
    filter: 'sepia(0.4) contrast(1.1) brightness(0.9)',
    category: 'product'
  },
  {
    id: 'neon-cyberpunk',
    name: 'سايبر بانك',
    prompt: 'on a reflective surface with neon blue and purple lights, cyberpunk city background, futuristic tech vibe, cinematic lighting',
    icon: '🎮',
    color: '#7c3aed',
    filter: 'contrast(1.3) hue-rotate(240deg) saturate(1.5)',
    category: 'product'
  },

  // --- Fashion / Model Presets (Female/General) ---
  {
    id: 'model-studio',
    name: 'موديل (نساء) - استوديو',
    prompt: 'worn by a professional female fashion model standing in a clean studio with soft lighting, neutral background, high fashion photography, realistic skin texture',
    icon: '💃',
    color: '#e2e8f0',
    filter: 'brightness(1.02) contrast(1.02)',
    category: 'fashion',
    gender: 'female'
  },
  {
    id: 'model-street',
    name: 'موديل (نساء) - شارع',
    prompt: 'worn by a stylish woman walking down a blurred city street, daylight, urban fashion, candid shot, photorealistic',
    icon: '🕶️',
    color: '#4b5563',
    filter: 'contrast(1.1) saturate(0.9)',
    category: 'fashion',
    gender: 'female'
  },
  {
    id: 'model-nature',
    name: 'موديل (نساء) - طبيعة',
    prompt: 'worn by a female model standing in a sunlit garden, soft bokeh nature background, fresh atmosphere, lifestyle photography',
    icon: '🌳',
    color: '#166534',
    filter: 'saturate(1.1) brightness(1.05)',
    category: 'fashion',
    gender: 'female'
  },
  {
    id: 'model-casual',
    name: 'موديل (نساء) - كاجوال',
    prompt: 'worn by a happy woman in a modern bright living room, casual lifestyle vibe, warm lighting, authentic look',
    icon: '🏠',
    color: '#d97706',
    filter: 'sepia(0.1) brightness(1.05)',
    category: 'fashion',
    gender: 'female'
  },
  {
    id: 'model-fitness',
    name: 'موديل (نساء) - رياضة',
    prompt: 'worn by a fit female model in a modern gym environment, active pose, bright artificial lighting, sports photography, dynamic angle',
    icon: '🏋️‍♀️',
    color: '#3b82f6',
    filter: 'contrast(1.2) brightness(1.05)',
    category: 'fashion',
    gender: 'female'
  },
  {
    id: 'model-business',
    name: 'موديل (نساء) - أعمال',
    prompt: 'worn by a professional woman in a modern office with glass windows, city skyline view, corporate look, confident pose',
    icon: '💼',
    color: '#1e293b',
    filter: 'contrast(1.05) saturate(0.8)',
    category: 'fashion',
    gender: 'female'
  },
  {
    id: 'model-winter',
    name: 'موديل (نساء) - شتاء',
    prompt: 'worn by a female model in a snowy winter landscape, soft falling snowflakes, cold cinematic lighting, cozy atmosphere',
    icon: '❄️',
    color: '#bae6fd',
    filter: 'brightness(1.1) contrast(0.9) hue-rotate(190deg) opacity(0.9)',
    category: 'fashion',
    gender: 'female'
  },
  {
    id: 'model-desert',
    name: 'موديل (نساء) - صحراء',
    prompt: 'worn by a female model in a golden desert dune at sunset, warm cinematic lighting, bohemian vibe, high fashion magazine style',
    icon: '🏜️',
    color: '#c2410c',
    filter: 'sepia(0.6) saturate(1.4) contrast(1.1)',
    category: 'fashion',
    gender: 'female'
  },
  {
    id: 'model-hijab-chic',
    name: 'أزياء محجبات',
    prompt: 'worn by a stylish modern modest fashion model with hijab, elegant urban architectural background, chic style, soft natural lighting',
    icon: '🧕',
    color: '#be185d',
    filter: 'contrast(1.05) brightness(1.05)',
    category: 'fashion',
    gender: 'female'
  },

  // --- Fashion / Model Presets (Male) ---
  {
    id: 'male-model-studio',
    name: 'موديل (رجال) - استوديو',
    prompt: 'worn by a handsome male fashion model in a clean minimal studio, professional lighting, sharp focus, masculine pose, high-end catalog look',
    icon: '🤵',
    color: '#1e293b',
    filter: 'contrast(1.1) brightness(0.95) grayscale(0.2)',
    category: 'fashion',
    gender: 'male'
  },
  {
    id: 'male-model-street',
    name: 'موديل (رجال) - كاجوال',
    prompt: 'worn by a stylish man standing in a blurred city street, casual urban fashion, daytime, photorealistic, depth of field',
    icon: '🧢',
    color: '#4b5563',
    filter: 'contrast(1.15) saturate(0.9)',
    category: 'fashion',
    gender: 'male'
  },
  {
    id: 'male-model-suit',
    name: 'موديل (رجال) - رسمي',
    prompt: 'worn by a professional man in a luxury office environment, business style, wearing a suit, confident pose, cinematic lighting',
    icon: '👔',
    color: '#0f172a',
    filter: 'sepia(0.1) contrast(1.1)',
    category: 'fashion',
    gender: 'male'
  },
  {
    id: 'male-model-gym',
    name: 'موديل (رجال) - رياضة',
    prompt: 'worn by a fit male model in a modern gym, athletic build, dramatic sports lighting, energetic atmosphere',
    icon: '🏋️‍♂️',
    color: '#2563eb',
    filter: 'contrast(1.2) brightness(1.05)',
    category: 'fashion',
    gender: 'male'
  },
  {
    id: 'male-model-beach',
    name: 'موديل (رجال) - صيفي',
    prompt: 'worn by a man on a sunny beach, summer vibes, blue sky and ocean background, relaxed lifestyle photography',
    icon: '🏖️',
    color: '#0ea5e9',
    filter: 'saturate(1.2) brightness(1.1)',
    category: 'fashion',
    gender: 'male'
  }
];

export const MAX_FILE_SIZE_MB = 10;
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
