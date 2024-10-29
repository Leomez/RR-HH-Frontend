import styles from './App.module.css'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Layout } from './Componentes/Layout/Layout'
import { Footer } from './Componentes/Footer/Footer'
import { AppRouter } from './Routes/AppRouter'
import { showError } from './Redux/Features/Error/errorSlice'
import { ErrorModal } from './Componentes/ErrorModal'


function App() {
  const dispatch = useDispatch()
  try {
    return (
      <>
        <Box className={styles.root} >
          <Layout>
            {/* <ErrorModal> */}
            <AppRouter />
            {/* </ErrorModal> */}
          </Layout>
        </Box>
        {/* <Footer /> */}
      </>
    )
  } catch (error) {
    console.log(error);
    dispatch(showError(error))
  }
}

export default App
