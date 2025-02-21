import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = { sign: string; translatedText: string };

const SignDisplay: React.FC<Props> = ({ sign, translatedText }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Sign: {sign}</Text>
    <Text style={styles.text}>Translated: {translatedText}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 10 },
  text: { fontSize: 18 },
});

export default SignDisplay;