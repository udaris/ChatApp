import Firebase from './firebaseConfig';

export const LoginUser = (email, password) => {
    try {

        return Firebase.auth().signInWithEmailAndPassword(email, password);

    } catch (error) {
        return error;
    }
}