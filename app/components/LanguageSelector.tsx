import React from 'react';
import { Picker } from '@react-native-picker/picker';

type Props = { selectedLanguage: string; onChange: (value: string) => void };

const LanguageSelector: React.FC<Props> = ({ selectedLanguage, onChange }) => (
  <Picker selectedValue={selectedLanguage} onValueChange={onChange} style={{ height: 50, width: 150 }}>
    <Picker.Item label="English" value="en" />
    <Picker.Item label="Spanish" value="es" />
  </Picker>
);

export default LanguageSelector;