// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/footer';

import LandingPage from './pages/landingpage';
import Service from './pages/service';
import Product from './pages/product';
import Article from './pages/article';
import Contact from './pages/contact';

import Dashboard from './pages/admin/dashboard';
import AddBook from './pages/admin/addBook';
import EditBook from './pages/admin/editBook';
import DetailBook from './pages/admin/detailBook';
import AddArticle from './pages/admin/addArticle';
import EditArticle from './pages/admin/editArticle';
import DetailArticle from './pages/admin/detailArticle';


const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/service" element={<Service />} />
          <Route path="/product" element={<Product />} />
          <Route path="/article" element={<Article />} />
          <Route path="/contact" element={<Contact />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-book" element={<AddBook />} />
          <Route path="/admin/edit-book/:id" element={<EditBook />} />
          <Route path="/admin/detail-book/:id" element={<DetailBook />} />
          <Route path="/admin/add-article" element={<AddArticle />} />
          <Route path="/admin/edit-article/:id" element={<EditArticle />} />
          <Route path="/admin/detail-article/:id" element={<DetailArticle />} />

          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;