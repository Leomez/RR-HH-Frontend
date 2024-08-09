import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../Config/firebase';

const fAuth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginConGoogle = async () => {
    try {
        const { user: { providerData, uid }, _tokenResponse: { idToken } } = await signInWithPopup(fAuth, provider);
        
        const usuario = {
            data: providerData,
            uid: uid,
            token: idToken,
        };
        
        return usuario;
    } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
        throw new Error('No se pudo completar el inicio de sesión con Google. Por favor, inténtalo de nuevo.');
    }
};

export { loginConGoogle };

