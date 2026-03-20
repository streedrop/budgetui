import './App.css'
import { useState } from 'react'
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
import Keywords from './pages/import/Keywords.jsx'

function App() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={collapsed ? 'collapsed' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/categories/new" element={<CategoryForm />} />
          <Route path="/categories/:id/edit" element={<CategoryForm />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/new" element={<TransactionForm />} />
          <Route path="/transactions/:id/edit" element={<TransactionForm />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/import" element={<Import />} />
          <Route path="/import/keywords" element={<Keywords />} />
        </Routes>
      </main>
    </>
  )
}

export default App
