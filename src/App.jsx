import './App.css'
import { Container } from '@mui/material'
import { Layout } from './Componentes/Layout/Layout'
import { AppRouter } from './Routes/AppRouter'


function App() {
  return (
    <Container>
      <Layout>
        <AppRouter />
      </Layout>      
    </Container>
  )
}

export default App
