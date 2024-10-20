/*
  Intro
  - backend 
  - authentication
  - cloud storage
  - cloud hosting 
  - real time database
  ...

  => plug directly into our front end


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Setup
  - npm init -y
  - npm install --save-dev parcel
    -> bundle the code
  - npm install firebase
  - package.json
    ->  "scripts": {
          "dev": "parcel",
          "build": "parcel build"
        },

\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Firebase Setup
  - Go To Console
  - Create Project
    # Disable Google Analytics
  - Click on Web icon </> -> Register App
    -> We will have code that is generated from Firebase 



*/

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCyCfXYR0ly79cyqObXQLVRz6NmAYH_4B8',
  authDomain: 'fir-10-tutorial.firebaseapp.com',
  projectId: 'fir-10-tutorial',
  storageBucket: 'fir-10-tutorial.appspot.com',
  messagingSenderId: '548902858061',
  appId: '1:548902858061:web:8bf2fd862355cf986d9b04',
  measurementId: 'G-QESWE2KQF4',
}

const app = initializeApp(firebaseConfig)
