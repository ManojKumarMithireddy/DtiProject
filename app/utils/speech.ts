import * as Speech from 'expo-speech';

export const speak = (text: string, language: string) => {
  Speech.speak(text, { language });
};