import { Routes, Route } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Footer from './components/Footer'
import Header from './components/Header'
import Login from './pages/users/Login'
import Register from './pages/users/Register'

const App = () => {

    return (
        <>
            <ToastContainer theme='colored' />
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App