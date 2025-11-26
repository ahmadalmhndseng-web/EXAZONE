
import { GoogleGenAI } from "@google/genai";

// Initialize the client
// The API key is guaranteed to be available in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a File object to a Base64 string required by the API.
 */
export const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Generates a new background or model try-on for the provided product image.
 */
export const generateProductBackground = async (
  imageFile: File,
  promptText: string,
  customInstruction?: string,
  isFashionMode: boolean = false
): Promise<string> => {
  try {
    const imagePart = await fileToGenerativePart(imageFile);

    let systemPrompt = '';

    if (isFashionMode) {
      // Specialized prompt for "Model Try-On"
      // We relax the "geometry" constraint slightly to allow the clothes to fit a body,
      // while strictly enforcing texture/pattern preservation.
      systemPrompt = `
        You are an expert fashion photographer and AI stylist.
        Input: An image of a clothing item (flat lay, mannequin, or ghost).
        Task: Generate a photorealistic image of a real human model wearing this EXACT clothing item.
        
        CRITICAL GUIDELINES:
        1. The clothing item from the input must be the PRIMARY focus.
        2. You MUST preserve the clothing's color, pattern, logo, and texture 100%.
        3. Fit the clothing naturally onto the model's body (draping, lighting, fit). Do not distort the branding.
        4. Scene/Context: ${promptText}.
        ${customInstruction ? `5. Additional details: ${customInstruction}` : ''}
        
        Output: A high-quality, 4k, photorealistic fashion shot.
      `;
    } else {
      // Specialized prompt for "Product Placement"
      // Strict geometry preservation.
      systemPrompt = `
        You are an expert product photographer and photo editor.
        Task: Keep the main product/subject in this image EXACTLY as it is. 
        Do not change the shape, color, or details of the foreground object.
        Change the background to: ${promptText}. 
        ${customInstruction ? `Additional details: ${customInstruction}` : ''}
        Ensure realistic lighting and shadows that match the new background.
        The result should be high-quality, 4k, photorealistic.
      `;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using the appropriate model for image tasks
      contents: {
        parts: [
            imagePart.inlineData ? { inlineData: imagePart.inlineData } : { text: '' }, 
            { text: systemPrompt }
        ]
      },
      // Note: responseMimeType is not supported for this model family currently
    });

    // Parse the response to find the image part
    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image was generated in the response.");

  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
