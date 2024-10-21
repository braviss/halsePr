import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = ({isAuthenticated, userName}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light border-bottom border-dark mb-4">
            <div className="container">
                <a className="navbar-brand" href="#">hALSE</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog" className="nav-link">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/survey" className="nav-link">Survey</Link>
                        </li>
                    </ul>
                    {isAuthenticated ? (
                        <div className="d-flex align-items-center">
                            <Link to="/dashboard" className="nav-link">{userName}</Link>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
