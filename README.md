SignLanguageTranslator/
├── app/                        # Main app source directory (Expo convention)
│   ├── components/             # Reusable UI components
│   │   ├── CameraView.tsx      # Camera preview component
│   │   ├── SignDisplay.tsx     # Displays recognized sign and translation
│   │   └── LanguageSelector.tsx # Dropdown for selecting output language
│   ├── screens/                # App screens
│   │   └── HomeScreen.tsx      # Main screen integrating all features
│   ├── utils/                  # Utility functions
│   │   ├── model.ts            # Model loading and prediction logic
│   │   ├── poseDetection.ts    # Pose detection and keypoint extraction
│   │   ├── translation.ts      # Text translation logic
│   │   └── speech.ts           # Speech output logic
│   ├── constants/              # Constants and configuration
│   │   ├── classes.ts          # Sign language class labels
│   │   └── languages.ts        # Supported spoken languages
│   └── _layout.tsx             # Root layout (replaces App.tsx in Expo Router)
├── app-example/                # Example app folder (can be removed or kept as reference)
├── app.json                    # Expo configuration file
├── assets/                     # Static assets like ML models and images
│   ├── sign_model/             # TensorFlow.js model files
│   │   ├── model.json          # Model architecture
│   │   └── group1-shard1of1.bin # Model weights
│   └── placeholder.png         # Optional placeholder image
├── expo-env.d.ts               # TypeScript declarations for Expo environment
├── node_modules/               # Installed dependencies
├── package-lock.json           # Dependency lock file
├── package.json                # Project dependencies and scripts
├── README.md                   # Project documentation
└── tsconfig.json               # TypeScript configuration