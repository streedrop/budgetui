import './App.css'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/navbar/NavBar.jsx'

import Home from './pages/home/home.jsx'
import Transactions from './pages/transactions/transactions.jsx'

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </main>
    </>
  )
}

export default App
