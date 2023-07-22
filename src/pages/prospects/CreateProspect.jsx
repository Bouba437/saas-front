import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddProspectMutation } from '../../services/prospectsApi';

const CreateProspect = () => {

    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);

    const [prospect, setProspect] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "", 
        address: "", 
        zip: "", 
        city: "", 
        status: "prospect", 
        phone: "", 
        description: "",
        user_id: auth.id,
    });

    const [addProspect] = useAddProspectMutation();

    const handleSubmit = async e => {
        e.preventDefault();
        const { firstName, lastName, email, company, address, zip, city, status, phone, description } = prospect;
        if(!firstName || !lastName || !email || !company || !address || !zip || !city || !status || !phone || !description) {
            toast.error("Tous les champs sont obligatoires..", {position: "top-right"});
        } else {
            await addProspect(prospect);
            navigate("/user/follow-prospect");
            toast.success("Prospect ajouté avec succès", {position: "top-right"});
        }
    }

    const handleInputChange = e => {
        let { name, value } = e.target;
        setProspect({ ...prospect, [name]: value});
    };

    console.log("client: ", prospect);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="border p-4">
                <h2 className="text-center mb-4">Ajout d'un prospect</h2>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Prénom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Adresse email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="company" className="form-label">Entreprise</label>
                    <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Adresse</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="zip" className="form-label">Code postal</label>
                    <input
                        type="number"
                        className="form-control"
                        id="zip"
                        name="zip"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">Ville</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>
                    <select
                        className="form-control"
                        id="status"
                        name="status"
                        defaultValue="prospect"
                        onChange={handleInputChange}
                    >
                        <option value="prospect">Prospect</option>
                        <option value="client">Client</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Téléphone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        onChange={handleInputChange}
                    />
                </div>
                
                <button className="btn btn-primary">Enrégistrer</button>
            </form>
        </div>
    )
}

export default CreateProspect