import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Config/firebase";



const loginConUsuYCont = async (input) => {
  console.log(input);
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, input.usuario, input.password);

    // Signed in         
    const response = userCredential.user;    
    const idToken = await response.getIdToken();

    const usuario = {
      success: true,
      data: response.providerData,
      uid: response.uid,
      token: idToken

    }    
    return usuario
  } catch (error) {
    const errorLoguin = {
      success: false,
      errorCode: error.code,
      errorMessage: error.message
    }

    console.log(errorLoguin);
    return errorLoguin
    // (
    //   <Alert severity="error" sx={{ mb: 2 }}>
    //     {
    //       errorLoguin.errorCode === "auth/wrong-password" ? "Contraseña incorrecta" :
    //         errorLoguin.errorCode === "auth/user-not-found" ? "Usuario no encontrado" :
    //           "Error al logearse"}
    //   </Alert>
    // )
  }
}

export default loginConUsuYCont
