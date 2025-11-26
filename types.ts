
export interface BackgroundPreset {
  id: string;
  name: string;
  prompt: string;
  icon: string;
  color: string; // Hex color for UI accents
  filter: string; // CSS filter to simulate mood
  category: 'product' | 'fashion';
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GeneratedImage {
  imageUrl: string;
  originalPrompt: string;
}
