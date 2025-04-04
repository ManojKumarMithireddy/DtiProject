import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { GLView } from 'expo-gl';
import * as tf from '@tensorflow/tfjs';
import * as tfReactNative from '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

export default function camera() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isTfReady, setIsTfReady] = useState(false);
  const [signLabel, setSignLabel] = useState('');
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      // Wait for TensorFlow to be ready
      await tf.ready();
      await tfReactNative.setBackend('rn-webgl');
      setIsTfReady(true);

      console.log('TensorFlow ready!');
    })();
  }, []);

  const detectSign = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
    const imageTensor = tfReactNative.decodeJpeg(new Uint8Array(Buffer.from(photo.base64!, 'base64')));

    // Load TFLite model from assets (replace with your model files)
    const modelJson = require('./model/sign_model.json');
    const modelWeights = require('./model/sign_model_weights.bin');

    const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));

    const resized = tf.image.resizeBilinear(imageTensor, [224, 224]).div(255).expandDims(0);
    const prediction = model.predict(resized) as tf.Tensor;
    const output = prediction.argMax(1).dataSync()[0];

    setSignLabel(`Predicted Label: ${output}`);
  };

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} ref={(ref) => (cameraRef.current = ref)} />

      <TouchableOpacity style={styles.button} onPress={detectSign} disabled={!isTfReady}>
        <Text style={styles.buttonText}>{isTfReady ? 'Detect Sign' : 'Loading TensorFlow...'}</Text>
      </TouchableOpacity>

      {signLabel !== '' && <Text style={styles.label}>{signLabel}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  label: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: '#000a',
    padding: 10,
    borderRadius: 8,
    color: 'white',
    fontSize: 18,
  },
});
