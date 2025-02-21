import * as tf from '@tensorflow/tfjs';
import { classes } from '../constants/classes';

export const loadModel = async () => {
  await tf.ready();
  return await tf.loadLayersModel('file://assets/sign_model/model.json');
};

export const predictSign = async (model: any, keypoints: number[][]) => {
  const input = tf.tensor3d([keypoints], [1, 30, 99]);
  const prediction = model.predict(input) as tf.Tensor;
  const signIndex = prediction.argMax(-1).dataSync()[0];
  return classes[signIndex];
};