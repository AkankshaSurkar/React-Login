import React from 'react';
import classes from './Home.module.css';

const Home = (props) =>{
    return (
        <div className={classes.home}>
            <h1>Welcome back!</h1>
            <button onClick= {props.onLogout}>Logout</button>

        </div>
    );
};
export default Home;