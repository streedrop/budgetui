import './App.css'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/navbar/NavBar.jsx'

import Home from './pages/home/home.jsx'
import Categories from './pages/categories/Categories.jsx'
import NewCategory from './pages/categories/NewCategory.jsx'
import Transactions from './pages/transactions/Transactions.jsx'
import TransactionForm from './pages/transactions/TransactionForm.jsx'

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/new" element={<NewCategory />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/new" element={<TransactionForm />} />
          <Route path="/transactions/edit/:id" element={<TransactionForm />} />
        </Routes>
      </main>
    </>
  )
}

export default App
