import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";

// import SpotifyWebApi from 'spotify-web-api-js';
// const spotifyApi = new SpotifyWebApi();

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

class Profile extends Component {
  // constructor(props){
  //   super(props);
  // }
  render() {
    var top_artists = this.props.artists.split(",");
    var top_artists_pics = this.props.pics.split(",");
    var top_tracks = this.props.tracks.split("`");
    var top_tracks_pics = this.props.tracksPic.split(",");

    return (
      <section class="profile">
        <nav>
          <div>
            <a href="/">
              <Link to="/">Home</Link>
            </a>
          </div>
          <div>
            <a href={`/artists?user=${this.state.id}`}>
              <Link to="/profile">Profile</Link>
            </a>
          </div>
          <div>
            <a href={`/friends?user=${this.state.id}`}>
              <Link to="/friends">Friends</Link>
            </a>
          </div>
        </nav>

        <main>
          <div class="artists">
            <h2>{this.props.userinfo.username}'s Top Artists:</h2>
            <ol>
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
          <div class="tracks">
            <h2>{this.props.userinfo.username}'s Top Tracks:</h2>
            <ol>
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
        </main>
      </section>
    );
  }
}
export default Profile;
