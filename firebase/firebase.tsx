import firebase from 'firebase/compat/app';
import 'firebase/compat/ml';

const firebaseConfig = {
  apiKey: "AIzaSyAHbf4urVM_qExq6P8EDKH705mv_WdDinw",
  authDomain: "dti-sign-detection-model.firebaseapp.com",
  projectId: "dti-sign-detection-model",
  storageBucket: "dti-sign-detection-model.firebasestorage.app",
  messagingSenderId: "428762571806",
  appId: "1:428762571806:android:6f1f8bc9578ebf38fb3a0f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;