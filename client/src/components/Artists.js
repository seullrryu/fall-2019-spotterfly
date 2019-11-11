import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import '../App.css';

class Artists extends Component {
    render() {
        return(
            <div class="container">
                <section class="top-artists">
                    <nav>
                        <div><Link to="/">Home</Link></div>
                        <div><Link to="/profile">Profile</Link></div>
                    </nav>
                    <h2>Thanks for logging in! Your top artists have been imported. </h2>
                    <br></br>
                    <p>Your top artists are: </p>
                    <div class="display-box">

                    </div>
                </section>
            </div>
        ) 
    }
}
export default Artists;