import {useEffect} from 'react'
import { useProspectsQuery } from '../../../services/prospectsApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProspectsList = () => {

    const { data, error, isLoading, isSuccess, isFetching } = useProspectsQuery();

    useEffect(() => {
        if(error) {
            toast.error("Quelque chose s'est mal passée..")
        }
    }, [error]);

    return (
        <div className='container'>
            <h2 className='text-center mt-4 mb-4'>Liste des prospects</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Entreprise</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col" colSpan="3">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    { data &&
                        data.map( prospect => {
                            return (
                                <tr key={prospect.id}>
                                    <td>{prospect.id}</td>
                                    <td>{prospect.firstName}</td>
                                    <td>{prospect.lastName}</td>
                                    <td>{prospect.email}</td>
                                    <td>{prospect.company}</td>
                                    <td>{prospect.phone}</td>
                                    <td>
                                        <Link 
                                            to={`/admin/prospects/edit/${prospect.id}`}
                                        >
                                            <button className='btn btn-primary'>Modifier</button>
                                        </Link>
                                        <button className='btn btn-danger'>
                                            Supprimer
                                        </button>
                                        <Link
                                            to={`/admin/prospects/find/${prospect.id}`}
                                        >
                                            <button className='btn btn-success'>
                                                Voir
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

export default ProspectsList