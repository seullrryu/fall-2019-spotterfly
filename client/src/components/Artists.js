import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Artists extends Component {
  componentDidMount() {
    fetch("/playlist/me", { method: "GET" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("not working.");
        }
      })
      .then(response => {
        if (this._isMounted) {
          this.setState({ playlist: response });
        }
      });
  }
  render() {
    return (
      <div class="container">
        <section class="top-artists">
          <nav>
            <div>
              <a href="/">
                <Link to="/">Home</Link>
              </a>
            </div>
            <div>
              <Link to="/profile">Profile</Link>
            </div>
          </nav>
          <h2>Thanks for logging in! Your top artists have been imported. </h2>
          <br></br>
          <p>Your top artists are: </p>
          <div class="display-box"></div>
        </section>
      </div>
    );
  }
}
export default Artists;
