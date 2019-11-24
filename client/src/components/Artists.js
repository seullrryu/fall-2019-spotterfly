import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();
class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      user: "",
      datas: [],
      imagez: []
    };
  }

  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams = urlParams.toString();
    var fields = urlParams.split("=");
    const id = fields[1];
    const url = `http://localhost:8888/playlistdata/${id}`;
    axios.get(url).then(res => {
      this.setState({
        id: res.data.id,
        user: res.data.displayName,
        datas: res.data.songName,
        imagez: res.data.image
      });
    });

    /*   var processeddata2 = [];
    this.state.datas.forEach(element => {
      console.log(element);
      spotifyApi.getTrack(element).then(
        function(data) {
          console.log("Artist albums", data);
        },
        function(err) {
          console.error(err);
        }
      );
    });

    this.setState({
      processdatas: processeddata2
    }); */ //this is for parsing songID but it doesnt work
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
          <h2>
            Thanks for logging in {this.state.user}! Your top tracks have been
            imported.{" "}
          </h2>
          <br></br>
          <p>Your top tracks are: </p>
          <div className="display-box"></div>
          <div style={{ float: "left" }}>
            {this.state.datas.map(function(song, index) {
              return <li key={index}>{song}</li>;
            })}
          </div>
          <div style={{ float: "left" }}>
            {this.state.imagez.map(function(song, index) {
              return (
                <li key={index}>
                  <img src={song}></img>
                </li>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}
export default Artists;
