import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    return (
        <div className='vh-100'>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Bienvenue sur CanisCRM</h1>
                    <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            <div className="container">

            </div>
        </div>
    );
};

export default Home;
