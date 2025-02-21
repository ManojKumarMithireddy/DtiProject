import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraView from '../components/CameraView';
import SignDisplay from '../components/SignDisplay';
import LanguageSelector from '../components/LanguageSelector';
import { loadModel, predictSign } from '../utils/model';
import { detectPose } from '../utils/poseDetection';
import { translateText } from '../utils/translation';
import { speak } from '../utils/speech';

const HomeScreen = () => {
  const [sign, setSign] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('en');
  const [model, setModel] = useState<any>(null);

  useEffect(() => {
    loadModel().then(setModel);
  }, []);

  const handleFrame = async (uri: string) => {
    if (model) {
      const keypoints = await detectPose(uri);
      const predictedSign = await predictSign(model, keypoints);
      setSign(predictedSign);
      const translated = await translateText(predictedSign, language);
      setTranslatedText(translated);
      speak(translated, language);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView onFrame={handleFrame} />
      <SignDisplay sign={sign} translatedText={translatedText} />
      <LanguageSelector selectedLanguage={language} onChange={setLanguage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default HomeScreen;