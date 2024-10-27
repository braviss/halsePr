import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Survey from './pages/Survey';
import ResultPage from './pages/ResultPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import OrderPage from "./pages/OrderPage";
import './App.css';
import ProductDetail from "./components/ProductDetail";
import Page from "./components/Page";
import './i18n';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/result" element={<ResultPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/articles/:slug" element={<ArticlePage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/products/:productId" element={<ProductDetail />} />
                <Route path="/page/:slug" element={<Page />} />
            </Routes>
        </Router>
    );
}

export default App;