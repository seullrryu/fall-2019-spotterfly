import React, { Component } from 'react';
import '../App.css';

class Login extends Component {
    render() {
        return(
            <section class="login">
                <h1>SPOTTERFLY</h1>
                <p1>Share your playlists with people near you with similar tastes.</p1>
                <p>Discover new music.</p>
                <a href='http://localhost:8888/login'>
                    <button id="login-button">
                    <b>LOG IN WITH SPOTIFY</b>
                    </button>
                </a>
            </section>
        ) 
    }
}
export default Login;