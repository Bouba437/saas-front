import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../slices/authSlice';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);

    console.log(auth);

    useEffect(() => {
        if(auth.id) {
            navigate("/")
        }
    }, [auth.id, navigate]);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(loginUser(user));
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 login">
            <form onSubmit={handleSubmit} className="border p-4">
                <h2 className="text-center mb-4">Connexion</h2>
                
                    {
                        auth.loginStatus === "rejected" ? (
                            <div className="alert alert-danger" role="alert">
                                {auth.loginError}
                            </div>
                        ) : null
                    }                

                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                </div>
                <button className="btn btn-primary">
                    {
                        auth.loginStatus === "pending" ? "Connexion en cours..." : "Se connecter"
                    }
                </button>
            </form>
        </div>
    );
};

export default Login;
