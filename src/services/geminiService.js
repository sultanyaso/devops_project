import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const generatePrompt = (topic, template, tone) => {
  return `Generate a LinkedIn post about "${topic}" in a ${tone} tone.
The post should follow this template style: ${template}.
Include 3-4 key points or highlights.
Make it engaging and encourage interaction.
Keep it professional and authentic.
Maximum length: 300 words.`;
};

export const generatePostContent = async (topic, template, tone) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = generatePrompt(topic, template, tone);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating post:', error);
    throw new Error('Failed to generate post content');
  }
};

export const generateHashtags = async (topic) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate 5 relevant professional hashtags for a LinkedIn post about "${topic}".
Make them specific and trending.
Format: Return only the hashtags, separated by spaces, without numbering or bullets.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text.split(' ').filter(tag => tag.startsWith('#'));
  } catch (error) {
    console.error('Error generating hashtags:', error);
    throw new Error('Failed to generate hashtags');
  }
};