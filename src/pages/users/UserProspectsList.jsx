import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUserProspectsQuery, useDeleteProspectMutation } from '../../services/prospectsApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProspectsList = () => {

    const auth = useSelector(state => state.auth);

    const { data: userProspects, error, isLoading, isSuccess, isFetching } = useUserProspectsQuery(auth.id);
    const [deleteProspect] = useDeleteProspectMutation();

    useEffect(() => {
        if(error) {
            toast.error("Quelque chose s'est mal passée..")
        }
    }, [error]);

    const handleDelete = async (id) => {
        if(window.confirm("Etes-vous certain de vouloir supprimer ce prospect ? Veuillez noter que cette action est irréversible..")) {
            await deleteProspect(id);
            toast.success("Prospect supprimé avec succès..")
        }
    }

    return (
        <div className='container'>
            <h2 className='text-center mt-4 mb-4'>Ma liste de prospects</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col" colSpan="3">Actions</th>
                       
                    </tr>
                </thead>
                <tbody>
                    { userProspects &&
                        userProspects.map( prospect => {
                            return (
                                <tr key={prospect.id}>
                                    <td>{prospect.id}</td>
                                    <td>{prospect.firstName}</td>
                                    <td>{prospect.lastName}</td>
                                    <td>{prospect.phone}</td>
                                    <td>
                                        <Link 
                                            to={`/prospects/edit/${prospect.id}`}
                                        >
                                            <button className='btn btn-primary me-3'>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </Link>
                                        <button 
                                            className='btn btn-danger me-3'
                                            onClick={() => handleDelete(prospect.id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <Link
                                            to={`/prospects/find/${prospect.id}`}
                                        >
                                            <button className='btn btn-success'>
                                                <i className="bi bi-eye"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default UserProspectsList