import Firebase from './firebaseConfig';

export const SignupUser = async(email, password) => {
try {
    return await Firebase.auth().createUserWithEmailAndPassword(email, password);
} catch (error) {
    return error;
}
}