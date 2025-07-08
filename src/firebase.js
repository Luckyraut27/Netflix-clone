import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCfBJZL_HuycmZxji8kFGII30o5rCk7_l0",
  authDomain: "netflix-clo-a4e11.firebaseapp.com",
  projectId: "netflix-clo-a4e11",
  storageBucket: "netflix-clo-a4e11.firebasestorage.app",
  messagingSenderId: "716678890898",
  appId: "1:716678890898:web:794123566ceee9d14a2d4b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name ,email,password)=>{
try{
   const res = await createUserWithEmailAndPassword(auth,email,password);
   const user = res.user;
   await addDoc(collection(db, "user"),{
    
    uid: user.uid,
    name,
    authProvider:"local",
    email,

   });
}
catch (error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));

}
}

const login = async(email,password)=>{
    try{
   await signInWithEmailAndPassword(auth,email,password);
    }
    catch(error){
            
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    
}

}


const logout = ()=> {
    signOut(auth);
}

export {auth,db,login,signup,logout};