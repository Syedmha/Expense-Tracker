const signIn = document.querySelector('#sign-in');
const auth = firebase.auth();

const googleAuth = () => {
    let  provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then((result) => {
        window.location.assign('main.html');
})
.catch(error => {
    console.error(error);
})
}


signIn.addEventListener('click', googleAuth);

