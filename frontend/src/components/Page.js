import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from "./Footer";
import Breadcrumbs from "../components/Breadcrumbs";

const Page = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const {slug} = useParams();
    const [page, setPage] = useState(null);

    useEffect(() => {
        axios.get(`${apiUrl}/content/page/${slug}/`)
            .then(response => setPage(response.data))
            .catch(error => console.error('Error fetching page:', error));
    }, [slug]);

    if (!page) return <p>Loading...</p>;

    const breadcrumbs = [
        {label: 'Home', path: '/'},
        {label: page.title, path: ''}
    ];

    return (
        <div className="DDbrqN vgsMax">
            <div className="FtzZyQ">
                <Navbar/>
                <section className="QB2rhE">
                    <div className="j4XGWX">
                        <div className="XiPxXu">
                            <p className="wOsFmC">{page.title}</p>
                        </div>
                    </div>
                </section>

                <div className="pUdEWu">
                    <Breadcrumbs items={breadcrumbs}/>
                   <div dangerouslySetInnerHTML={{__html: page.text}}/>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
