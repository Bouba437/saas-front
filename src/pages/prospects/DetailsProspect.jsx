import { useEffect } from 'react';
import { useProspectQuery } from '../../services/prospectsApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const DetailsProspect = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const {data: prospect, error, isFetching, isLoading} = useProspectQuery(id);
    
    useEffect(() => {
        if(error) {
            toast.error("Quelque chose s'est mal passée..")
        }
    }, [error]);

    return (
        <div className="container mt-4">
            <h2>Profil de prospect</h2>
            {prospect && 
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>ID:</strong> {prospect.id}</p>
                        <p><strong>Prénom:</strong> {prospect && prospect.firstName}</p>
                        <p><strong>Nom:</strong> {prospect.lastName}</p>
                        <p><strong>Email:</strong> {prospect.email}</p>
                        <p><strong>Entreprise:</strong> {prospect.company}</p>
                        <p><strong>Adresse:</strong> {prospect.address}</p>
                        <p><strong>Code postal:</strong> {prospect.zip}</p>
                        <p><strong>Ville:</strong> {prospect.city}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Statut:</strong> {prospect.status}</p>
                        <p><strong>Téléphone:</strong> {prospect.phone}</p>
                        <p><strong>Description:</strong></p>
                        <p>{prospect.description}</p>
                    </div>
                    <button 
                        className='btn btn-primary'
                        onClick={() => navigate("/user/follow-prospect")}
                    >
                        <i className='bi bi-arrow-left'></i>
                        back
                    </button>
                </div>
            }
        </div>
    )
}

export default DetailsProspect