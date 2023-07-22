import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">CanisCRM</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page" >Accueil</Link>
                        </li>
                        {
                            auth.id ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link" >Mon agenda</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/user/follow-prospect" className="nav-link" >Mon suivi client</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link" >Mes statistiques</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/prospects/all" className="nav-link" >Admin</Link>
                                    </li>
                                </>
                            ) : (
                                ""
                            )
                        }
                    </ul>
                    <div className="d-flex">
                        {
                            auth.id ? (
                                <>
                                    <Link to='/' className="btn btn-outline-success" >{auth.firstName } {auth.lastName}</Link>
                                    <Link to='/logout' 
                                        className="btn btn-outline-success" 
                                        onClick={() => {
                                            dispatch(logoutUser(null));
                                            toast.warning("Vous êtes déconnecté. A bientôt..", {position: "top-right"});
                                        }}
                                    >
                                        Se Déconnecter
                                    </Link>

                                </>
                            ) : (
                                <>
                                    <Link to='/register' className="me-2 btn btn-outline-success">S'inscrire</Link>
                                    <Link to='/login' className="btn btn-outline-success" >Se connecter</Link>
                                </>
                            )
                        }
                        
                        
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header