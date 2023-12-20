import { Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/Features/Login/userSlice";


function Logout() {
    const auth = getAuth();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
      try {
        await signOut(auth)
        dispatch(logoutUser())
        navigate('/', {replace: true})        
      } catch (error) {
        console.log(error);
      }
    }    
    return(
        <Button color="inherit" onClick={handleLogout}>Salir</Button>
    )
}

export default Logout
