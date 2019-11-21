import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";
//import SpotifyWebApi from "spotify-web-api-js";
//const spotifyApi = new SpotifyWebApi();
class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: []
    };
  }
  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams = urlParams.toString();
    var fields = urlParams.split("=");
    var id = fields[1];

    fetch("http://localhost:8888/playlistdata/" + id, { method: "GET" }).then(
      response => {
        if (response.ok) {
          console.log(response.json());
          //   this.setState({ playlist: response.json() });
        } else {
          throw new Error("error");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <section className="top-artists">
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

          <div className="display-box">
            {/*         {Object.keys(this.state.playlists).map((c, i) => (
              <li key={i}>{c.displayName}</li>    
            ))} */}
          </div>
        </section>
      </div>
    );
  }
}
export default Artists;
