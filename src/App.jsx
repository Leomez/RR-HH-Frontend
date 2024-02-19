import './App.css'
import { Box } from '@mui/material'
import { Layout } from './Componentes/Layout/Layout'
import { AppRouter } from './Routes/AppRouter'


function App() {  
  return (
    <Box>
      <Layout>
        <AppRouter />
      </Layout>      
    </Box>
  )
}

export default App
