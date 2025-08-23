import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPUIw6gd6qBrls4rInSOGv0q-cjC1OLzg",
  authDomain: "netflix-clone-d0a6d.firebaseapp.com",
  projectId: "netflix-clone-d0a6d",
  storageBucket: "netflix-clone-d0a6d.firebasestorage.app",
  messagingSenderId: "790040521994",
  appId: "1:790040521994:web:06f7d371d11c376a661ef3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })

  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }

}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }

}

const logout = () => {
  signOut(auth);

}
export { auth, db, login, signup, logout };