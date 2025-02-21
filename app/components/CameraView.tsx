import { Camera } from 'expo-camera';
import React, { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';

type Props = { onFrame: (uri: string) => void };

const CameraView: React.FC<Props> = ({ onFrame }) => {
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        onFrame(photo.uri);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back} />;
};

const styles = StyleSheet.create({
  camera: { flex: 1 },
});

export default CameraView;