import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../slices/api';
import axios from 'axios';

const EmailVerify = () => {

    const [validUrl, setValidUrl] = useState(false);

    const params = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `${baseUrl}/auth/${params.id}/verify/${params.token}`;
                const {data} = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false)
            }
        };
        verifyEmailUrl();
    }, [params]);

    return (
        <div>
            {
                validUrl ? (
                    <div>
                        <h2>Email vérifié avec succès...</h2>
                        <Link to="/login">
                            <button className='btn btn-primary'>Se connecter</button>
                        </Link>
                    </div>
                ) : (
                    <h2>404 Page non trouvé</h2>
                )
            }
        </div>
    )
}

export default EmailVerify