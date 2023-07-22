import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Register = () => {

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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(registerUser(user));
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 register">
            <form onSubmit={handleSubmit} className="border p-4">
                <h2 className="text-center mb-4">Inscription</h2>
                
                    {
                        auth.registerStatus === "rejected" ? (
                            <div className="alert alert-danger" role="alert">
                                {auth.registerError}
                            </div>
                        ) : null
                    }                

                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Prénom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={user.firstName}
                        onChange={(e) => setUser({...user, firstName: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={user.lastName}
                        onChange={(e) => setUser({...user, lastName: e.target.value})}
                    />
                </div>
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
                        auth.registerStatus === "pending" ? "Envoi en cours..." : "S'inscrire"
                    }
                </button>
            </form>
        </div>
    );
};

export default Register;
