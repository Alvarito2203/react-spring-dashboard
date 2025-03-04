import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Reemplaza con tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAD6pMi5-NpjdDErUv_xkXqSzcl4mR0aWc",
    authDomain: "tarea-facturas.firebaseapp.com",
    projectId: "tarea-facturas",
    storageBucket: "tarea-facturas.firebasestorage.app",
    messagingSenderId: "999073656309",
    appId: "1:999073656309:web:4ad2d2ed16d95c344904bc"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getFacturas(tipo) {
  const colRef = collection(db, tipo);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => doc.data());
}
