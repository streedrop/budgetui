import './App.css'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/navbar/NavBar.jsx'

import Home from './pages/home/home.jsx'
import Categories from './pages/categories/Categories.jsx'
import Category from './pages/categories/Category.jsx'
import CategoryForm from './pages/categories/CategoryForm.jsx'
import Transactions from './pages/transactions/Transactions.jsx'
import TransactionForm from './pages/transactions/TransactionForm.jsx'

import Charts from './pages/charts/Charts.jsx'

import Import from './pages/import/Import.jsx'

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
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/categories/new" element={<CategoryForm />} />
          <Route path="/categories/edit/:id" element={<CategoryForm />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/new" element={<TransactionForm />} />
          <Route path="/transactions/edit/:id" element={<TransactionForm />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/import" element={<Import />} />
        </Routes>
      </main>
    </>
  )
}

export default App
