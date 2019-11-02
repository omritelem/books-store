import React  from 'react';

import BooksList from "../../components/BooksList/BooksList";
import './Home.css';

const Home = () => {
    return (
        <div className='Home'>
            <header className="App-header">
                Books Store
            </header>
            <BooksList />
        </div>
    );
};

export default Home;
