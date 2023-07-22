import React from 'react'
import { Link } from 'react-router-dom'
import UserProspectsList from './UserProspectsList'

const FollowProspect = () => {
    return (
        <div className='text-center'>
            <h2 className='mt-4 mb-4'>Suivi clients</h2>
            <Link className='text-center btn btn-primary' to="/prospects/create">Ajouter un nouveau client</Link>
            <UserProspectsList />
        </div>
    )
}

export default FollowProspect