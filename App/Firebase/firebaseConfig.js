import Firebase from 'firebase';

const firebaseConfig={
    apiKey:"AIzaSyC6iG5zxMRPKtYIg3qbV6tZXOb--gefjSg",
    databaseURL:"https://chatapplatest-cf8a3-default-rtdb.firebaseio.com/",
    projectId:"chatapplatest-cf8a3",
    appId:"1:144374281100:android:42154c99b22680c3469ca9",
};

export default Firebase.initializeApp(firebaseConfig);