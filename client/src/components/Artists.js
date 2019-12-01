import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";
import axios from "axios";
//import SpotifyWebApi from "spotify-web-api-js";
//const spotifyApi = new SpotifyWebApi();

function TracksItem(props) {
  const name = props.obj;
  const pics = props.pics;
  var index = props.index;
  return (
    <li>
      <div className="tracks-item">
        <span>{name}</span>
        <br></br>
        <img
          src={pics[index]}
          width="300"
          height="300"
          alt="We don't have the images. Sorry :("
        />
        <br></br>
        <br></br>
      </div>
    </li>
  );
}
function ArtistItem(props) {
  const name = props.obj;
  const pics = props.pics;
  var index = props.index;
  return (
    <li>
      <div className="artist-item">
        <span>{name}</span>
        <br></br>
        <img
          src={pics[index]}
          width="300"
          height="300"
          alt="We don't have the images. Sorry :("
        />
        <br></br>
        <br></br>
      </div>
    </li>
  );
}
class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      user: "",
      datas: [],
      imagez: [],
      artist: [],
      artistimage: []
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
        datas: res.data.songName.slice(0,5),
        imagez: res.data.image.slice(0,5),
        artist: res.data.artist,
        artistimage: res.data.artistImage
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
    var top_tracks = this.state.datas;
    var top_tracks_pics = this.state.imagez;
    var top_artists = this.state.artist;
    var top_artists_pics = this.state.artistimage;

    return (
      <section className="profile">
        <nav>
          <div>
            <a href="/">
              <Link to="/"><img id="home-icon" src="/icons/home.png" width="50" height="50" alt="Home"></img></Link>
            </a>
          </div>
          <div>
            <a href={`/artists?user=${this.state.id}`}>
              <Link to="/profile"><img id="profile-icon" src="/icons/profile.png" width="50" height="50" alt="Profile"></img></Link>
            </a>
          </div>
          <div>
            <a href={`/friends?user=${this.state.id}`}>
              <Link to="/friends"><img id="friends-icon" src="/icons/friends.png" width="50" height="50" alt="Friends"></img></Link>
            </a>
          </div>
          <div id="logout">
            <a href="#"><img id="logout-icon" src="/icons/logout.png" width="50" height="50" alt="Log Out"></img></a>
          </div>
        </nav>

        <br></br>
        <main>
          <h2>
            Thanks for logging in {this.state.user}! Your top tracks have been
            imported.
          </h2>
          <article id="top">
              <div className="items">
                <ol>
                  <p className="labels">Top Tracks</p>
                  {top_tracks.map((object, i) => {
                    return (
                      <TracksItem
                        obj={object}
                        pics={top_tracks_pics}
                        index={i}
                      ></TracksItem>
                    );
                  })}
                </ol>
              </div>
              
              <div className="items"> 
                <ol>
                  <p className="labels">Top Artists</p>
                  {top_artists.map((object, i) => {
                    return (
                      <ArtistItem
                        obj={object}
                        pics={top_artists_pics}
                        index={i}
                      ></ArtistItem>
                    );
                  })}
                </ol>
              </div>
            </article> 
        </main>
      </section>
    );
  }
}
export default Artists;
