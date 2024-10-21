import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            axios.get('http://localhost:8000/users/me/', {
                headers: {Authorization: `Bearer ${token}`}
            })
                .then(response => {
                    setIsAuthenticated(true);
                    setUserName(response.data.username);
                    console.log(response.data);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                });
        }
    }, []);
    const isTestTaken = localStorage.getItem('lowestScoreBlock') !== null;


    return (
        <div className="">
            <Navbar isAuthenticated={isAuthenticated} userName={userName}/>
            {isTestTaken && (
                <div className="mt-4">
                    <Link to="/result" className="btn btn-primary border-none">View result page</Link>
                </div>
            )}
            <section>
                <div className="py-5">
                    <div className="row">
                        <div className="col-lg-6 col-md-8">
                            <h1 className="fw-light">Album example</h1>
                            <p className="lead text-muted">Something short and leading about the collection below—its
                                contents, the creator, etc. Make it short and sweet, but not too short so folks don’t
                                simply
                                skip over it entirely.</p>
                            <p>
                                <a href="#" className="btn btn-primary my-2 border-none">Start survay</a>
                                <a href="#" className="btn btn-secondary my-2">View blog</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
