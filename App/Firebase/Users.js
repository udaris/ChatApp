import Firebase from './firebaseConfig';

export const  AddUser = (name, email, image, uid) => {
try {
    return  Firebase.database().ref('users/'+ uid).
    set({
        name:name,
        email:email,
        image:image,
        userId:uid
    });
} catch (error) {
    return error;
}
}

export const  UpdateUserImage = async(image, uid) => {
    try {
        return  Firebase
        .database()
        .ref('users/'+ uid) 
        .update({ 
            image:image
        });
    } catch (error) {
        return error;
    }
    }