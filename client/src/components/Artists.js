import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";
//import SpotifyWebApi from "spotify-web-api-js";
//const spotifyApi = new SpotifyWebApi();
class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id
    };
  }
  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams = urlParams.toString();
    var fields = urlParams.split("=");
    var id = fields[1];
    console.log(id);

    fetch(
      "http://localhost:8888/playlistdata/" + id,

      { method: "GET" }
    )
      .then(response => {
        if (response.ok) {
          //return response.json();
          console.log(response.json());
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
