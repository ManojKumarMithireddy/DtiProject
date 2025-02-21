import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';

export const detectPose = async (imageUri: string) => {
  const net = await posenet.load();
  const image = await tf.browser.fromPixelsAsync({ uri: imageUri });
  const pose = await net.estimateSinglePose(image);
  return pose.keypoints.map(k => [k.position.x, k.position.y, k.score]);
};