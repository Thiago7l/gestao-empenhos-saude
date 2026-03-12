import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0KJqc1U42CN_2JRQkzanDxQ3eY3fc9W1",
  authDomain: "saude-sete-lagoas.firebaseapp.com",
  projectId: "saude-sete-lagoas",
  storageBucket: "saude-sete-lagoas.firebasestorage.app",
  messagingSenderId: "854059107794",
  appId: "1:854059107794:web:4e1638dde9f85612ad348b"
};

const app = initializeApp(firebaseConfig);

// Esta linha abaixo é a mais importante para sumir o erro!
export const db = getFirestore(app);