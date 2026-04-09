import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RECHARTS_DEVTOOLS_PORTAL_ID } from '@recharts/devtools';

import NavBar from './components/navbar/NavBar.jsx'

import Dashboard from './pages/dashboard/Dashboard.jsx'
import Categories from './pages/categories/Categories.jsx'
import Category from './pages/categories/Category.jsx'
import CategoryForm from './pages/categories/CategoryForm.jsx'
import Transactions from './pages/transactions/Transactions.jsx'
import TransactionForm from './pages/transactions/TransactionForm.jsx'

import Charts from './pages/charts/Charts.jsx'

import Import from './pages/import/Import.jsx'
import Rules from './pages/rules/Rules.jsx'

import Dev from './pages/devtools/Dev.jsx'

const queryClient = new QueryClient();

function App() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className={collapsed ? 'collapsed' : ''}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/new" element={<TransactionForm />} />
            <Route path="/transactions/:id/edit" element={<TransactionForm />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<Category />} />
            <Route path="/categories/new" element={<CategoryForm />} />
            <Route path="/categories/:id/edit" element={<CategoryForm />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/import" element={<Import />} />
            <Route path="/import/rules" element={<Rules />} />
            <Route path="/dev" element={<Dev />} />
          </Routes>
          <div id={RECHARTS_DEVTOOLS_PORTAL_ID} />
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
