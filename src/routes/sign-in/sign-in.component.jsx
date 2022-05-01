import { signInWithGooglePopup, createUSerDocumentFromAuth, createUserDocumetFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
       const userDocRef = createUserDocumetFromAuth(user);
    };
    return (
        <div className="sign-in">
            <h1>Sign IN</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google
            </button>
        </div>
    )
}
export default SignIn;