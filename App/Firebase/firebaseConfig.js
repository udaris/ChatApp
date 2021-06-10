import Firebase from 'firebase';

const firebaseConfig={
    apiKey:"AIzaSyAluiVH7YnWPJw623x9ZuVkyksSpmazZXQ",
    databaseURL:"https://chatapp01-7ee63-default-rtdb.firebaseio.com/",
    projectId:"chatapp01-7ee63",
    appId:"1:428001866204:android:191484122ed3d612011f19"
};

export default Firebase.initializeApp(firebaseConfig);