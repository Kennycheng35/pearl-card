import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ZoneForm from './components/ZoneForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{marginBottom:20}}>
        <Header title={"PearlCard"} />
      </div>
      <div>
        <ZoneForm />
      </div>
    </>
  )
}

export default App
