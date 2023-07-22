import { Routes, Route } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Footer from './components/Footer'
import Header from './components/Header'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import EmailVerify from './pages/users/EmailVerify';
import ProspectsList from './pages/admin/prospects/ProspectsList';
import CreateProspect from './pages/prospects/CreateProspect';
import FollowProspect from './pages/users/FollowProspect';
import DetailsProspect from './pages/prospects/DetailsProspect';
import EditProspect from './pages/prospects/EditProspect';

const App = () => {

    return (
        <>
            <ToastContainer theme='colored' />
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/prospects/find/:id' element={<DetailsProspect />} />
                <Route path='/prospects/edit/:id' element={<EditProspect />} />
                <Route path='/user/follow-prospect' element={<FollowProspect />} />
                <Route path='/prospects/create' element={<CreateProspect />} />
                <Route path='/admin/prospects/all' element={<ProspectsList />} />
                <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
            </Routes>
            {/* <Footer /> */}
        </>
    )
}

export default App