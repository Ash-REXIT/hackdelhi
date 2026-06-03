import React from 'react';
import Navbar from './components/Navbar';
import BlogPage from './components/BlogPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <BlogPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
