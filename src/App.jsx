import './App.css'
import { Box } from '@mui/material'
import { Layout } from './Componentes/Layout/Layout'
import { AppRouter } from './Routes/AppRouter'
import ErrorModal from './Componentes/ErrorModal'


function App() {
  return (
    <Box>
      <Layout>
        <ErrorModal />
        <AppRouter />
      </Layout>
    </Box>
  )
}

export default App
