const signIn = document.querySelector('#sign-in');
const auth = firebase.auth();
const currentUser = auth.currentUser;



const googleAuth = () => {
    let  provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then((result) =>  window.location.assign('main.html'))
.catch(error => {
    console.error(error);
})
}


// function updatedb () {
//     const currentUser = auth.currentUser;
//     const db = firebase.firestore();
//     const timestamp = firebase.firestore.FieldValue.serverTimestamp();

//             console.log('yes');
//             db.collection('users').add({
//                 uid: currentUser.uid,
//                 emial: currentUser.email,
//                 uname: currentUser.displayName,
//                 image: currentUser.photoURL,
//                 timestamp: timestamp,
//               })
              
              
// }

// window.location.assign('main.html')

// async function googleAuth(event) {
//     event.preventDefault();
//     let provider = new firebase.auth.GoogleAuthProvider();
//     try {
//       await auth.signInWithPopup(provider).then((res) => window.location.assign('main.html'))
//     } catch (err) {
//       alert(err.message);
//     }
//   }


signIn.addEventListener('click', googleAuth);

