import styles from './App.module.css'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from './Componentes/Layout/Layout'
import { Footer } from './Componentes/Footer/Footer'
import { AppRouter } from './Routes/AppRouter'
import { showError } from './Redux/Features/Error/errorSlice'
import { ErrorModal } from './Componentes/ErrorModal'


function App() {
  const dispatch = useDispatch()
  // const showErrorModal = useSelector(state => state.error)
  // const errorMessage = useSelector(state => state.error.errorMessage)

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
