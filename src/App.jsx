import './App.css'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Layout } from './Componentes/Layout/Layout'
import { AppRouter } from './Routes/AppRouter'
import { showError } from './Redux/Features/Error/errorSlice'
// import { ErrorModal } from './Componentes/ErrorModal'


function App() {
  const dispatch = useDispatch()
  try {
    return (
      <Box>
        <Layout>
          {/* <ErrorModal /> */}
          <AppRouter />
        </Layout>
      </Box>
    )    
  } catch (error) {
    console.log(error);
    dispatch(showError(error))
  }
}

export default App
