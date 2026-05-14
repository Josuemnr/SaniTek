import{
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";


//LOGIN
export const loginUser = async (email: string, password: string): Promise <string> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem("token", token);
    return token;
};

//LOGOUT (IKER)