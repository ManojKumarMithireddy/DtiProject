import axios from 'axios';

export const translateText = async (text: string, targetLang: string) => {
  const response = await axios.post(
    'https://translation.googleapis.com/language/translate/v2',
    { q: text, target: targetLang, key: 'YOUR_GOOGLE_API_KEY' }
  );
  return response.data.data.translations[0].translatedText;
};