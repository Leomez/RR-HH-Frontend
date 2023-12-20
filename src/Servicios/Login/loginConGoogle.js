import { getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { app } from '../../Config/firebase';

const fAuth = getAuth(app)
const provider = new GoogleAuthProvider()

const loginConGoogle = async () => {
    const { user: { providerData, uid },
        _tokenResponse: { idToken }
    } = await signInWithPopup(fAuth, provider)
    
    const usuario = {
        data: providerData,
        uid: uid,
        token: idToken
    }
    return usuario    
}

export { loginConGoogle }
